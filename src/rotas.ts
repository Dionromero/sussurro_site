export const paginas = [
  {
    id: "inicio",
    caminho: "",
    rotulo: "Início",
    titulo: "Sussurro: rede de apoio às mulheres em Curitiba",
    descricao:
      "App gratuito para Android com mapa da rede de proteção de Curitiba, telefones de emergência, pessoas de confiança e guias de direitos. Sem cadastro.",
  },
  {
    id: "o-app",
    caminho: "o-app/",
    rotulo: "O app",
    titulo: "O que o app Sussurro faz: mapa, contatos e direitos",
    descricao:
      "Mapa com 90 locais de apoio em Curitiba, envio da localização para pessoas de confiança, sete guias de direitos e modo discreto. Veja telas reais do app.",
  },
  {
    id: "privacidade",
    caminho: "privacidade/",
    rotulo: "Privacidade",
    titulo: "Política de privacidade do Sussurro",
    descricao:
      "Quais dados o app Sussurro e este site usam, para onde vão, por quanto tempo ficam e como pedir a exclusão. Também o que o app não faz.",
  },
  {
    id: "instalar",
    caminho: "instalar/",
    rotulo: "Instalar",
    titulo: "Baixar e instalar o Sussurro no Android (APK)",
    descricao:
      "Baixe o APK do Sussurro para Android 7 ou mais novo, confira o SHA-256 do arquivo e instale em três passos, sem desativar a proteção do celular.",
  },
  {
    id: "sobre",
    caminho: "sobre/",
    rotulo: "Sobre",
    titulo: "Sobre o Sussurro: quem faz e de onde vêm os dados",
    descricao:
      "O Sussurro é um projeto de extensão de estudantes da Gran Faculdade, com piloto em Curitiba. Conheça as fontes oficiais dos endereços e telefones.",
  },
] as const;

export type Pagina = (typeof paginas)[number];
export type IdPagina = Pagina["id"];
export type IdTela = IdPagina | "404";

export const hrefDe = (id: IdPagina) => `/${paginas.find((p) => p.id === id)!.caminho}`;
