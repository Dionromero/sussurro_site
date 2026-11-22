import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const { renderizar } = await import(`${raiz}.prerender/servidor.js`);

const arquivos = {
  inicio: "index.html",
  "o-app": "o-app/index.html",
  privacidade: "privacidade/index.html",
  instalar: "instalar/index.html",
  sobre: "sobre/index.html",
  404: "404.html",
};

for (const [pagina, arquivo] of Object.entries(arquivos)) {
  const destino = `${raiz}dist/${arquivo}`;
  const html = readFileSync(destino, "utf8");
  const vazio = `<div id="root" data-pagina="${pagina}"></div>`;
  if (!html.includes(vazio)) throw new Error(`${arquivo}: não achei ${vazio}`);

  const preloads = [];
  const corpo = renderizar(pagina).replace(/<link rel="preload"[^>]*>/g, (tag) => {
    preloads.push(tag);
    return "";
  });
  const pronto = html
    .replace(vazio, () => vazio.replace("></div>", `>${corpo}</div>`))
    .replace("</head>", () => `${preloads.map((tag) => `  ${tag}\n`).join("")}</head>`);
  writeFileSync(destino, pronto);
  console.log(`prerender ${arquivo} ${(corpo.length / 1024).toFixed(1)} kB`);
}

rmSync(`${raiz}.prerender`, { recursive: true });
