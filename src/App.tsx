import type { ComponentType } from "react";
import { Layout } from "./layout/Layout";
import { PaginaContext } from "./pagina";
import { PaginaInicio } from "./paginas/Inicio";
import { PaginaInstalar } from "./paginas/Instalar";
import { PaginaNaoEncontrada } from "./paginas/NaoEncontrada";
import { PaginaOApp } from "./paginas/OApp";
import { PaginaPrivacidade } from "./paginas/Privacidade";
import { PaginaSobre } from "./paginas/Sobre";
import type { IdTela } from "./rotas";

const conteudo: Record<IdTela, ComponentType> = {
  inicio: PaginaInicio,
  "o-app": PaginaOApp,
  privacidade: PaginaPrivacidade,
  instalar: PaginaInstalar,
  sobre: PaginaSobre,
  "404": PaginaNaoEncontrada,
};

export function App({ pagina }: { pagina: IdTela }) {
  const Pagina = conteudo[pagina];
  return (
    <PaginaContext value={pagina}>
      <Layout>
        <Pagina />
      </Layout>
    </PaginaContext>
  );
}
