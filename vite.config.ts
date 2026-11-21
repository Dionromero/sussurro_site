import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { paginas } from "./src/rotas.ts";

const RAIZ = fileURLToPath(new URL(".", import.meta.url));
const PASTA_DOWNLOADS = join(RAIZ, "public/downloads");
const MODULO = "virtual:apk";

type RegraVercel = { source: string; headers: { key: string; value: string }[] };
type Vercel = { headers: RegraVercel[] };
const vercel: Vercel = JSON.parse(readFileSync(join(RAIZ, "vercel.json"), "utf8"));

const cabecalhosDe = (source: string): Record<string, string> =>
  Object.fromEntries((vercel.headers.find((r) => r.source === source)?.headers ?? []).map((h) => [h.key, h.value]));

const SEGURANCA = cabecalhosDe("/(.*)");
const SEGURANCA_ACOMPANHAR = cabecalhosDe("/acompanhar(.*)");
// sem CSP no dev: o Vite usa script inline e WebSocket
const { "Content-Security-Policy": _csp, ...SEGURANCA_DEV } = SEGURANCA;
const { "Content-Security-Policy": _cspAcomp, ...SEGURANCA_ACOMPANHAR_DEV } = SEGURANCA_ACOMPANHAR;

function cabecalhosPorRota(): Plugin {
  const aplicar = (regras: Record<string, string>) => {
    return (req: { url?: string }, res: { setHeader: (k: string, v: string) => void }, next: () => void) => {
      if (req.url?.startsWith("/acompanhar")) {
        for (const [k, v] of Object.entries(regras)) res.setHeader(k, v);
      }
      next();
    };
  };
  return {
    name: "cabecalhos-por-rota",
    configureServer(servidor) {
      servidor.middlewares.use(aplicar(SEGURANCA_ACOMPANHAR_DEV));
    },
    configurePreviewServer(servidor) {
      servidor.middlewares.use(aplicar(SEGURANCA_ACOMPANHAR));
    },
  };
}

function cabecalhosSeguranca(): Plugin {
  return {
    name: "cabecalhos-seguranca",
    apply: "build",
    generateBundle() {
      const bloco = (rota: string, mapa: Record<string, string>) => [
        rota,
        ...Object.entries(mapa).map(([nome, valor]) => `  ${nome}: ${valor}`),
        "",
      ];
      const linhas = [
        ...bloco("/*", SEGURANCA),
        ...(Object.keys(SEGURANCA_ACOMPANHAR).length ? bloco("/acompanhar/*", SEGURANCA_ACOMPANHAR) : []),
      ];
      this.emitFile({ type: "asset", fileName: "_headers", source: linhas.join("\n") });
    },
  };
}

function lerApk() {
  if (!existsSync(PASTA_DOWNLOADS)) return null;
  const [maisRecente] = readdirSync(PASTA_DOWNLOADS)
    .filter((nome) => nome.toLowerCase().endsWith(".apk"))
    .map((nome) => ({ nome, info: statSync(join(PASTA_DOWNLOADS, nome)) }))
    .sort((a, b) => b.info.mtimeMs - a.info.mtimeMs);
  if (!maisRecente) return null;

  const conteudo = readFileSync(join(PASTA_DOWNLOADS, maisRecente.nome));
  return {
    arquivo: maisRecente.nome,
    versao: maisRecente.nome.match(/\d+\.\d+\.\d+/)?.[0] ?? null,
    bytes: maisRecente.info.size,
    sha256: createHash("sha256").update(conteudo).digest("hex"),
  };
}

function apk(): Plugin {
  const id = "\0" + MODULO;
  return {
    name: "apk",
    resolveId: (origem) => (origem === MODULO ? id : undefined),
    load: (origem) => (origem === id ? `export default ${JSON.stringify(lerApk())};` : undefined),
    configureServer(servidor) {
      const atualizar = (arquivo: string) => {
        if (!arquivo.toLowerCase().endsWith(".apk")) return;
        const modulo = servidor.moduleGraph.getModuleById(id);
        if (modulo) servidor.moduleGraph.invalidateModule(modulo);
        servidor.ws.send({ type: "full-reload" });
      };
      servidor.watcher.on("add", atualizar).on("change", atualizar).on("unlink", atualizar);
    },
  };
}

function cabecaComum(): Plugin {
  const meta = (name: string, content: string) => ({ tag: "meta", attrs: { name, content }, injectTo: "head" as const });
  return {
    name: "cabeca-comum",
    transformIndexHtml: {
      order: "pre",
      handler: () => [
        meta("theme-color", "#7A2E3A"),
        meta("referrer", "no-referrer"),
        meta("robots", "noindex"),
        { tag: "link", attrs: { rel: "icon", type: "image/png", href: "/favicon.png" }, injectTo: "head" },
        {
          tag: "link",
          attrs: { rel: "preload", href: "/fonts/Fraunces-Variable.ttf", as: "font", type: "font/ttf", crossorigin: true },
          injectTo: "head",
        },
      ],
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), apk(), cabecaComum(), cabecalhosPorRota(), cabecalhosSeguranca()],
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(paginas.map((p) => [p.id, resolve(RAIZ, p.caminho, "index.html")])),
        acompanhar: resolve(RAIZ, "acompanhar/index.html"),
      },
    },
  },
  server: { port: 3000, host: true, headers: SEGURANCA_DEV },
  preview: { port: 3000, host: true, headers: SEGURANCA },
});
