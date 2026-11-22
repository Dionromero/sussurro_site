import type { ReactNode } from "react";
import { LinkPagina } from "../components/LinkPagina";
import { usePagina } from "../pagina";
import { paginas } from "../rotas";

export function Abertura({ titulo, lead }: { titulo: ReactNode; lead: ReactNode }) {
  const atual = usePagina();
  const rotulo = paginas.find((p) => p.id === atual)?.rotulo;

  return (
    <section className="abertura">
      <div className="container">
        <nav className="trilha" aria-label="Você está em">
          <LinkPagina para="inicio">Início</LinkPagina>
          {rotulo && (
            <>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{rotulo}</span>
            </>
          )}
        </nav>
        <h1 className="titulo-xl">{titulo}</h1>
        <p className="abertura__lead">{lead}</p>
      </div>
    </section>
  );
}
