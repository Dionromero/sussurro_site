import { Chamada } from "../sections/Chamada";
import { Emergencia } from "../sections/Emergencia";
import { Hero } from "../sections/Hero";
import { Perguntas } from "../sections/Perguntas";
import { Telas } from "../sections/Telas";

export function PaginaInicio() {
  return (
    <>
      <Hero />
      <Emergencia />
      <Telas />
      <Perguntas />
      <Chamada />
    </>
  );
}
