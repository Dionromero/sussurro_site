import { createContext, useContext } from "react";
import type { IdTela } from "./rotas";

export const PaginaContext = createContext<IdTela>("inicio");
export const usePagina = () => useContext(PaginaContext);
