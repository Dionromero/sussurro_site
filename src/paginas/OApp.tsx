import { Abertura } from "../layout/Abertura";
import { ModoDiscreto } from "../sections/ModoDiscreto";
import { PorDentro } from "../sections/PorDentro";

export function PaginaOApp() {
  return (
    <>
      <Abertura
        titulo="O que o Sussurro faz"
        lead="Reúne telefones de emergência, locais de atendimento, contatos e direitos em um só lugar. Ele não substitui o atendimento especializado: ajuda a chegar até ele."
      />
      <PorDentro />
      <ModoDiscreto />
    </>
  );
}
