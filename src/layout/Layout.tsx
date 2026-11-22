import type { MouseEvent, ReactNode } from "react";
import { useRevelar } from "../revelar";
import { Cabecalho } from "./Cabecalho";
import { FaixaEmergencia } from "./FaixaEmergencia";
import { Rodape } from "./Rodape";

function pularParaConteudo(evento: MouseEvent<HTMLAnchorElement>) {
  evento.preventDefault();
  document.getElementById("conteudo")?.focus();
}

export function Layout({ children }: { children: ReactNode }) {
  useRevelar();

  return (
    <>
      <a className="pular" href="#conteudo" onClick={pularParaConteudo}>
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <FaixaEmergencia />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Rodape />
    </>
  );
}
