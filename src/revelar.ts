import { useEffect, type CSSProperties } from "react";

export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as CSSProperties;

export function useRevelar() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>("[data-revelar]");
    const revelar = (alvo: Element) => alvo.classList.add("revelado");
    if (!("IntersectionObserver" in window)) {
      alvos.forEach(revelar);
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          revelar(entrada.target);
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, []);
}
