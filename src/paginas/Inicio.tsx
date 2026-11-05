import { Chamada } from "../sections/Chamada";
import { Destaques } from "../sections/Destaques";
import { Emergencia } from "../sections/Emergencia";
import { Hero } from "../sections/Hero";
import { Manifesto } from "../sections/Manifesto";

export function PaginaInicio() {
  return (
    <>
      <Hero />
      <Emergencia />
      <Destaques />
      <Manifesto />
      <Chamada />
    </>
  );
}
