import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import type { IdTela } from "./rotas";
import "./styles.css";

const raiz = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App pagina={raiz.dataset.pagina as IdTela} />
  </StrictMode>
);

if (raiz.firstElementChild) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
