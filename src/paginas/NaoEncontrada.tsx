import { LinkPagina } from "../components/LinkPagina";
import { Abertura } from "../layout/Abertura";

export function PaginaNaoEncontrada() {
  return (
    <>
      <Abertura titulo="Esta página não existe" lead="O endereço pode ter sido digitado errado ou a página mudou de lugar." />
      <section className="secao secao--colada">
        <div className="container">
          <LinkPagina para="inicio" className="botao botao--primario">
            Ir para o início
          </LinkPagina>
        </div>
      </section>
    </>
  );
}
