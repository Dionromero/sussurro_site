import { useEffect } from "react";

export function useRevelar() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = [...document.querySelectorAll<HTMLElement>("[data-revelar]")].filter(
      (alvo) => alvo.getBoundingClientRect().top > window.innerHeight,
    );
    const revelar = (alvo: Element) => alvo.classList.remove("oculto");
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
    for (const alvo of alvos) {
      alvo.classList.add("oculto");
      observador.observe(alvo);
    }
    return () => {
      observador.disconnect();
      alvos.forEach(revelar);
    };
  }, []);
}
