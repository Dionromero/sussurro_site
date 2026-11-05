import type { MouseEvent } from "react";
import { paginas, type IdPagina, type Pagina } from "./rotas";

export const paginaAtual: Pagina =
  paginas.find((p) => p.id === document.getElementById("root")?.dataset.pagina) ?? paginas[0];

export const raiz = paginaAtual.caminho ? "../" : "./";

export const hrefDe = (id: IdPagina) => raiz + paginas.find((p) => p.id === id)!.caminho;

export function navegar(evento: MouseEvent<HTMLAnchorElement>) {
  if (evento.defaultPrevented || evento.button !== 0) return;
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;
  evento.preventDefault();
  window.location.replace(evento.currentTarget.href);
}
