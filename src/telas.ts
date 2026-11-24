import acompanhar from "./assets/telas/acompanhar.webp";
import acompanharP from "./assets/telas/acompanhar-320.webp";
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
  acompanhar: {
    grande: acompanhar,
    pequena: acompanharP,
    descricao:
      "Tela demonstrativa de acompanhamento ao vivo no navegador, com posição simulada em Curitiba, coordenadas, mapa e atalhos para traçar rota.",
  },
};
