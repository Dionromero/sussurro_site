import direitos from "./assets/telas/direitos.webp";
import direitosP from "./assets/telas/direitos-320.webp";
import inicio from "./assets/telas/inicio.webp";
import inicioP from "./assets/telas/inicio-320.webp";
import lista from "./assets/telas/lista.webp";
import listaP from "./assets/telas/lista-320.webp";

export const telas = {
  inicio: {
    grande: inicio,
    pequena: inicioP,
    descricao: "Tela inicial do app: botão para ligar 190 e mapa de Curitiba com os locais de apoio.",
  },
  lista: {
    grande: lista,
    pequena: listaP,
    descricao: "Lista da rede de apoio, com endereço, horário, data de verificação, telefone e botão Como chegar.",
  },
  direitos: {
    grande: direitos,
    pequena: direitosP,
    descricao: "Lista de guias do app: emergência, plano de segurança, boletim de ocorrência e medida protetiva.",
  },
};
