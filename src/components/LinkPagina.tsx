import type { AnchorHTMLAttributes } from "react";
import { hrefDe, navegar, paginaAtual } from "../navegacao";
import type { IdPagina } from "../rotas";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { para: IdPagina };

export function LinkPagina({ para, onClick, ...resto }: Props) {
  return (
    <a
      href={hrefDe(para)}
      aria-current={para === paginaAtual.id ? "page" : undefined}
      onClick={(evento) => {
        onClick?.(evento);
        navegar(evento);
      }}
      {...resto}
    />
  );
}
