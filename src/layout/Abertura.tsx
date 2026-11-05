import type { ReactNode } from "react";
import { LinkPagina } from "../components/LinkPagina";
import { paginaAtual } from "../navegacao";
import { paginas } from "../rotas";

export function Abertura({ titulo, lead }: { titulo: ReactNode; lead: ReactNode }) {
  const numero = String(paginas.findIndex((p) => p.id === paginaAtual.id) + 1).padStart(2, "0");

  return (
    <section className="abertura">
      <div className="container abertura__grade">
        <div className="abertura__texto">
          <nav className="trilha" aria-label="Você está em">
            <LinkPagina para="inicio">Início</LinkPagina>
            <span aria-hidden="true">/</span>
            <span>{paginaAtual.rotulo}</span>
          </nav>
          <h1 className="titulo-xl">{titulo}</h1>
          <p className="abertura__lead">{lead}</p>
        </div>
        <span className="abertura__numero" aria-hidden="true">
          {numero}
        </span>
      </div>
    </section>
  );
}
