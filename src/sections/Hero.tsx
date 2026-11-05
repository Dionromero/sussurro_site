import { ArrowRight, CloudOff, EyeOff, UserRoundX } from "lucide-react";
import ilustracao from "../assets/ilustracao.svg";
import { BotaoDownload } from "../components/BotaoDownload";
import { LinkPagina } from "../components/LinkPagina";
import { SeloCircular } from "../components/SeloCircular";
import { descreverDownload } from "../download";

const fatos = [
  { icone: UserRoundX, texto: "Sem cadastro" },
  { icone: CloudOff, texto: "Funciona sem internet" },
  { icone: EyeOff, texto: "Sem rastreadores" },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grade">
        <div className="hero__texto">
          <p className="selo-vivo">
            <span className="selo-vivo__ponto" aria-hidden="true" />
            Piloto em Curitiba · gratuito · sem login
          </p>
          <h1 className="titulo-xxl">
            Uma rede de apoio mais <em>perto</em> de você.
          </h1>
          <p className="hero__lead">
            O Sussurro é uma rede de apoio às mulheres no bolso. Ele mostra onde buscar atendimento em Curitiba, avisa
            pessoas de confiança com a sua localização e explica seus direitos em linguagem simples. Tudo sem cadastro.
          </p>
          <div className="hero__acoes">
            <BotaoDownload />
            <LinkPagina para="instalar" className="botao botao--secundario">
              Como instalar
              <ArrowRight size={18} aria-hidden="true" />
            </LinkPagina>
          </div>
          <p className="hero__nota">
            {descreverDownload("arquivo APK para Android") ??
              "O app está em fase de testes. Quando a versão pública sair, o download aparece aqui."}
          </p>
          <ul className="hero__fatos">
            {fatos.map(({ icone: Icone, texto }) => (
              <li key={texto}>
                <Icone size={18} aria-hidden="true" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero__arte">
          <div className="hero__moldura">
            <img
              src={ilustracao}
              alt="Ilustração de uma mulher de perfil, de olhos fechados, com o dedo indicador sobre os lábios."
              width={520}
              height={520}
            />
          </div>
          <SeloCircular className="hero__selo" />
        </figure>
      </div>
    </section>
  );
}
