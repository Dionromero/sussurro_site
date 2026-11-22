import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import type { IdTela } from "./rotas";

export const renderizar = (pagina: IdTela) =>
  renderToString(
    <StrictMode>
      <App pagina={pagina} />
    </StrictMode>,
  );
