import { ArrowRight } from "lucide-react";
import { LinkPagina } from "../components/LinkPagina";
import { Tela } from "../components/Tela";

const itens = [
  {
    tela: "inicio",
    titulo: "O 190 vem primeiro",
    texto: "Logo abaixo, o mapa com 90 locais de apoio. Você confirma antes de qualquer ligação.",
  },
  {
    tela: "lista",
    titulo: "Endereço com data de conferência",
    texto: "Cada local mostra telefone, horário, quem é atendido e quando o dado foi verificado.",
  },
  {
    tela: "direitos",
    titulo: "Sete guias que abrem sem internet",
    texto: "Da medida protetiva ao plano de segurança. Ainda aguardam revisão profissional, e o app avisa isso.",
  },
] as const;

export function Telas() {
  return (
    <section className="secao">
      <div className="container">
        <div className="secao__cabeca">
          <h2 className="titulo-l">O app por dentro</h2>
        </div>
        <ul className="telas">
          {itens.map(({ tela, titulo, texto }) => (
            <li key={titulo} data-revelar>
              <Tela tela={tela} tamanhos="(max-width: 47.5em) 140px, 290px" />
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
        <p className="telas__nota">
          Capturas da versão de testes, em novembro de 2026. Mapa © colaboradores do OpenStreetMap.{" "}
          <LinkPagina para="o-app" className="link-seta">
            Ver tudo o que o app faz
            <ArrowRight size={18} aria-hidden="true" />
          </LinkPagina>
        </p>
      </div>
    </section>
  );
}
