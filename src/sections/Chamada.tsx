import { ArrowRight } from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";
import { BotaoDownload } from "../components/BotaoDownload";
import { LinkPagina } from "../components/LinkPagina";
import { REQUISITOS } from "../config";
import { descreverDownload } from "../download";

export function Chamada() {
  return (
    <section className="secao">
      <div className="container">
        <div className="chamada" data-revelar>
          <img src={simbolo} alt="" className="chamada__marca" width={420} height={420} loading="lazy" />
          <h2 className="titulo-l">Baixe o Sussurro direto deste site</h2>
          <p className="chamada__texto">
            O app ainda não está na Play Store. Antes de instalar, veja como conferir o arquivo e o que apagar depois, se
            outra pessoa usa o seu celular.
          </p>
          <div className="chamada__acoes">
            <BotaoDownload variante="claro" />
            <LinkPagina para="instalar" className="botao botao--contorno">
              Instalar com segurança
              <ArrowRight size={18} aria-hidden="true" />
            </LinkPagina>
          </div>
          <p className="chamada__nota">{descreverDownload(REQUISITOS)}</p>
        </div>
      </div>
    </section>
  );
}
