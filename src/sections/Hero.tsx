import { ArrowRight } from "lucide-react";
import ilustracao from "../assets/ilustracao.svg";
import { BotaoDownload } from "../components/BotaoDownload";
import { LinkPagina } from "../components/LinkPagina";
import { REQUISITOS } from "../config";
import { descreverDownload } from "../download";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grade">
        <div className="hero__texto">
          <p className="rotulo">Aplicativo gratuito, em piloto em Curitiba</p>
          <h1 className="titulo-xxl">
            Uma rede de apoio mais <em>perto</em> de você.
          </h1>
          <p className="hero__lead">
            O Sussurro mostra onde buscar atendimento em Curitiba, prepara uma mensagem com a sua localização para as
            pessoas que você escolher e explica seus direitos em linguagem simples. Sem cadastro e sem anúncios.
          </p>
          <div className="hero__acoes">
            <BotaoDownload />
            <LinkPagina para="instalar" className="botao botao--secundario">
              Como instalar
              <ArrowRight size={18} aria-hidden="true" />
            </LinkPagina>
          </div>
          <p className="hero__nota">
            {descreverDownload(REQUISITOS) ?? "Quando a versão pública sair, o download aparece aqui."}
          </p>
        </div>

        <figure className="hero__arte">
          <div className="hero__moldura">
            <img
              src={ilustracao}
              alt="Ilustração de uma mulher de perfil, de olhos fechados, com o dedo indicador sobre os lábios."
              width={520}
              height={520}
              fetchPriority="high"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
