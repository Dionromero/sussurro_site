import { CONTATO_EMAIL, POLITICA_DATA, REQUISITOS, SITE_URL } from "./src/config.ts";
import { canais } from "./src/canais.ts";
import { perguntas } from "./src/perguntas.ts";
import { paginas, type Pagina } from "./src/rotas.ts";

export type Apk = { arquivo: string; versao: string | null; bytes: number; sha256: string } | null;
type Tag = { tag: string; attrs?: Record<string, string | boolean>; children?: string; injectTo: "head" };

const meta = (attrs: Record<string, string>): Tag => ({ tag: "meta", attrs, injectTo: "head" });
const link = (attrs: Record<string, string | boolean>): Tag => ({ tag: "link", attrs, injectTo: "head" });
const url = (caminho: string) => `${SITE_URL}/${caminho}`;

const fonte = (arquivo: string) =>
  link({ rel: "preload", href: `/fonts/${arquivo}`, as: "font", type: "font/woff2", crossorigin: true });

export function tagsComuns(): Tag[] {
  return [
    meta({ name: "theme-color", content: "#1e1715" }),
    meta({ name: "referrer", content: "no-referrer" }),
    link({ rel: "icon", type: "image/png", href: "/favicon.png" }),
    fonte("atkinson-regular-v1.woff2"),
    fonte("fraunces-v1.woff2"),
    { tag: "script", attrs: { src: "/saida.js", async: true }, injectTo: "head" },
  ];
}

function dadosEstruturados(pagina: Pagina, apk: Apk) {
  const org = { "@id": url("#projeto") };
  const grafo: object[] = [
    {
      "@type": "Organization",
      ...org,
      name: "Sussurro",
      url: url(""),
      description: "Projeto de extensão de estudantes da Gran Faculdade, em Curitiba/PR.",
      ...(CONTATO_EMAIL ? { email: CONTATO_EMAIL } : {}),
    },
    { "@type": "WebSite", "@id": url("#site"), url: url(""), name: "Sussurro", inLanguage: "pt-BR", publisher: org },
    {
      "@type": "WebPage",
      "@id": url(pagina.caminho),
      url: url(pagina.caminho),
      name: pagina.titulo,
      description: pagina.descricao,
      inLanguage: "pt-BR",
      isPartOf: { "@id": url("#site") },
      dateModified: POLITICA_DATA,
    },
  ];
  if (pagina.id === "inicio" || pagina.id === "o-app" || pagina.id === "instalar") {
    grafo.push({
      "@type": "MobileApplication",
      "@id": url("#app"),
      name: "Sussurro",
      operatingSystem: "Android 7.0 ou superior",
      applicationCategory: "UtilitiesApplication",
      inLanguage: "pt-BR",
      description: paginas[0].descricao,
      url: url("o-app/"),
      publisher: org,
      areaServed: { "@type": "City", name: "Curitiba" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      ...(apk
        ? {
            softwareVersion: apk.versao,
            fileSize: `${(apk.bytes / 1024 / 1024).toFixed(1)} MB`,
            downloadUrl: url(`downloads/${apk.arquivo}`),
          }
        : {}),
    });
  }
  if (pagina.id === "inicio") {
    grafo.push({
      "@type": "FAQPage",
      mainEntity: perguntas.map(({ pergunta, resposta }) => ({
        "@type": "Question",
        name: pergunta,
        acceptedAnswer: { "@type": "Answer", text: resposta },
      })),
    });
  } else {
    grafo.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: url("") },
        { "@type": "ListItem", position: 2, name: pagina.rotulo, item: url(pagina.caminho) },
      ],
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": grafo }).replaceAll("<", "\\u003c");
}

export function tagsDaPagina(pagina: Pagina, apk: Apk): Tag[] {
  return [
    { tag: "title", children: pagina.titulo, injectTo: "head" },
    meta({ name: "description", content: pagina.descricao }),
    link({ rel: "canonical", href: url(pagina.caminho) }),
    meta({ property: "og:type", content: "website" }),
    meta({ property: "og:locale", content: "pt_BR" }),
    meta({ property: "og:site_name", content: "Sussurro" }),
    meta({ property: "og:title", content: pagina.titulo }),
    meta({ property: "og:description", content: pagina.descricao }),
    meta({ property: "og:url", content: url(pagina.caminho) }),
    meta({ property: "og:image", content: url("og.webp") }),
    meta({ property: "og:image:type", content: "image/webp" }),
    meta({ property: "og:image:width", content: "1200" }),
    meta({ property: "og:image:height", content: "630" }),
    meta({ property: "og:image:alt", content: "Sussurro" }),
    meta({ name: "twitter:card", content: "summary_large_image" }),
    {
      tag: "script",
      attrs: { type: "application/ld+json" },
      children: dadosEstruturados(pagina, apk),
      injectTo: "head",
    },
  ];
}

export const tagsSemIndice = (titulo: string): Tag[] => [
  { tag: "title", children: titulo, injectTo: "head" },
  meta({ name: "robots", content: "noindex, nofollow" }),
];

export const robots = () => `User-agent: *\nAllow: /\n\nSitemap: ${url("sitemap.xml")}\n`;

export const sitemap = () =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paginas.map((p) => `  <url><loc>${url(p.caminho)}</loc><lastmod>${POLITICA_DATA}</lastmod></url>`),
    "</urlset>",
    "",
  ].join("\n");

export const llms = (apk: Apk) =>
  [
    "# Sussurro",
    "",
    `> ${paginas[0].descricao}`,
    "",
    "## Fatos",
    "",
    "- Projeto de extensão de estudantes da Gran Faculdade. Piloto em Curitiba/PR, Brasil.",
    `- Gratuito, sem cadastro. ${REQUISITOS}. Distribuído só por este site${apk?.versao ? ` (versão ${apk.versao})` : ""}.`,
    "- Não substitui o 190, o 180 nem o atendimento especializado.",
    "",
    "## Telefones",
    "",
    ...canais.map((c) => `- ${c.numero}: ${c.nome}. ${c.detalhe}`),
    "",
    "## Páginas",
    "",
    ...paginas.map((p) => `- [${p.rotulo}](${url(p.caminho)}): ${p.descricao}`),
    "",
    "## Perguntas frequentes",
    "",
    ...perguntas.flatMap(({ pergunta, resposta }) => [`### ${pergunta}`, "", resposta, ""]),
  ].join("\n");
