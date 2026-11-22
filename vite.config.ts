import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { llms, robots, sitemap, tagsComuns, tagsDaPagina, tagsSemIndice, type Apk } from "./seo.ts";
import { CONTATO_EMAIL } from "./src/config.ts";
import { paginas } from "./src/rotas.ts";

const RAIZ = fileURLToPath(new URL(".", import.meta.url));
const PASTA_DOWNLOADS = join(RAIZ, "public/downloads");
const MODULO = "virtual:apk";

type Regra = { source: string; headers: { key: string; value: string }[] };
const regras: Regra[] = JSON.parse(readFileSync(join(RAIZ, "vercel.json"), "utf8")).headers;

function cabecalhosDoVercel(): Plugin {
  const aplicar = (semCsp: boolean) => (req: { url?: string }, res: { setHeader(k: string, v: string): void }, next: () => void) => {
    const caminho = (req.url ?? "/").split(/[?#]/)[0];
    for (const { source, headers } of regras) {
      if (!new RegExp(`^${source}$`).test(caminho)) continue;
      for (const { key, value } of headers) {
        if (semCsp && (key === "Content-Security-Policy" || key === "Cache-Control")) continue;
        res.setHeader(key, value);
      }
    }
    next();
  };
  return {
    name: "cabecalhos-do-vercel",
    configureServer: (servidor) => void servidor.middlewares.use(aplicar(true)),
    configurePreviewServer: (servidor) => void servidor.middlewares.use(aplicar(false)),
  };
}

function lerApk(): Apk {
  if (!existsSync(PASTA_DOWNLOADS)) return null;
  const [maisRecente] = readdirSync(PASTA_DOWNLOADS)
    .filter((nome) => nome.toLowerCase().endsWith(".apk"))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  if (!maisRecente) return null;

  const caminho = join(PASTA_DOWNLOADS, maisRecente);
  return {
    arquivo: maisRecente,
    versao: maisRecente.match(/\d+\.\d+\.\d+/)?.[0] ?? null,
    bytes: statSync(caminho).size,
    sha256: createHash("sha256").update(readFileSync(caminho)).digest("hex"),
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

function cabeca(): Plugin {
  return {
    name: "cabeca",
    transformIndexHtml: {
      order: "pre",
      handler: (_html, { filename }) => {
        const arquivo = relative(RAIZ, filename);
        const pagina = paginas.find((p) => `${p.caminho}index.html` === arquivo);
        if (pagina) return [...tagsDaPagina(pagina, lerApk()), ...tagsComuns()];
        const titulo = arquivo === "404.html" ? "Página não encontrada · Sussurro" : "Localização compartilhada";
        return [...tagsSemIndice(titulo), ...tagsComuns()];
      },
    },
  };
}

function leafletSemIcones(): Plugin {
  return {
    name: "leaflet-sem-icones",
    enforce: "pre",
    transform: (css, id) =>
      id.endsWith("leaflet/dist/leaflet.css") ? css.replace(/[^{}]+\{[^{}]*url\(images[^{}]*\}/g, "") : undefined,
  };
}

function arquivosDeBusca(): Plugin {
  return {
    name: "arquivos-de-busca",
    apply: "build",
    generateBundle() {
      if (!CONTATO_EMAIL) this.warn("CONTATO_EMAIL vazio em src/config.ts: preencha antes de publicar.");
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots() });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap() });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llms(lerApk()) });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), apk(), leafletSemIcones(), ...(isSsrBuild ? [] : [cabeca(), cabecalhosDoVercel(), arquivosDeBusca()])],
  build: {
    assetsInlineLimit: 0,
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      input: isSsrBuild
        ? undefined
        : {
            ...Object.fromEntries(paginas.map((p) => [p.id, resolve(RAIZ, p.caminho, "index.html")])),
            "404": resolve(RAIZ, "404.html"),
            acompanhar: resolve(RAIZ, "acompanhar/index.html"),
          },
    },
  },
  server: { port: 3000 },
  preview: { port: 3000 },
}));
