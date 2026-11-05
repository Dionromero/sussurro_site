import { Abertura } from "../layout/Abertura";
import { ModoDiscreto } from "../sections/ModoDiscreto";
import { PorDentro } from "../sections/PorDentro";

export function PaginaOApp() {
  return (
    <>
      <Abertura
        titulo={
          <>
            Poucos toques até a ajuda <em>certa</em>.
          </>
        }
        lead="O app não substitui o atendimento especializado. Ele encurta o caminho até ele."
      />
      <PorDentro />
      <ModoDiscreto />
    </>
  );
}
