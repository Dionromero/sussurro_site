import type { AnchorHTMLAttributes } from "react";
import { usePagina } from "../pagina";
import { hrefDe, type IdPagina } from "../rotas";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { para: IdPagina };

export function LinkPagina({ para, ...resto }: Props) {
  const atual = usePagina();
  return <a href={hrefDe(para)} data-interno="" aria-current={para === atual ? "page" : undefined} {...resto} />;
}
