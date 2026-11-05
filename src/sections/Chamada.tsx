import { ArrowRight } from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";
import { BotaoDownload } from "../components/BotaoDownload";
import { LinkPagina } from "../components/LinkPagina";

export function Chamada() {
  return (
    <section className="secao secao--curta">
      <div className="container">
        <div className="chamada" data-revelar>
          <img src={simbolo} alt="" className="chamada__marca" width={420} height={420} />
          <p className="rotulo rotulo--claro">Gratuito para Android</p>
          <h2 className="titulo-l">
            Quando você precisar, ele <em>está aqui</em>.
          </h2>
          <p className="chamada__texto">
            Sem cadastro e sem anúncios. A instalação é feita em três passos, direto por este site.
          </p>
          <div className="chamada__acoes">
            <BotaoDownload variante="claro" />
            <LinkPagina para="instalar" className="botao botao--contorno">
              Ver como instalar
              <ArrowRight size={18} aria-hidden="true" />
            </LinkPagina>
          </div>
        </div>
      </div>
    </section>
  );
}
