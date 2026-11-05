export const paginas = [
  {
    id: "inicio",
    caminho: "",
    rotulo: "Início",
    resumo: "Uma rede de apoio às mulheres no bolso.",
  },
  {
    id: "o-app",
    caminho: "o-app/",
    rotulo: "O app",
    resumo: "Mapa da rede de proteção, pessoas de confiança, direitos e o modo discreto.",
  },
  {
    id: "privacidade",
    caminho: "privacidade/",
    rotulo: "Privacidade",
    resumo: "O que o app guarda, onde guarda e o que ele não faz.",
  },
  {
    id: "instalar",
    caminho: "instalar/",
    rotulo: "Instalar",
    resumo: "Baixe o arquivo do app e instale no Android em três passos.",
  },
  {
    id: "sobre",
    caminho: "sobre/",
    rotulo: "Sobre",
    resumo: "Um projeto de extensão de estudantes da Gran Faculdade, em Curitiba.",
  },
] as const;

export type Pagina = (typeof paginas)[number];
export type IdPagina = Pagina["id"];
