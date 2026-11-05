import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./layout/Layout";
import { paginaAtual } from "./navegacao";
import { PaginaInicio } from "./paginas/Inicio";
import { PaginaInstalar } from "./paginas/Instalar";
import { PaginaOApp } from "./paginas/OApp";
import { PaginaPrivacidade } from "./paginas/Privacidade";
import { PaginaSobre } from "./paginas/Sobre";
import type { IdPagina } from "./rotas";
import "./styles.css";

const conteudo: Record<IdPagina, ComponentType> = {
  inicio: PaginaInicio,
  "o-app": PaginaOApp,
  privacidade: PaginaPrivacidade,
  instalar: PaginaInstalar,
  sobre: PaginaSobre,
};

const Pagina = conteudo[paginaAtual.id];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Pagina />
    </Layout>
  </StrictMode>,
);
