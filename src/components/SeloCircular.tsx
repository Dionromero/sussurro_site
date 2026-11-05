import { Brilho } from "./Brilho";

const RAIO = 50;
const TEXTO = "gratuito · sem login · sem rastreio · ";

export function SeloCircular({ className }: { className?: string }) {
  return (
    <div className={`selo ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 128 128" className="selo__texto">
        <path id="selo-circulo" d={`M64 64 m-${RAIO} 0 a${RAIO} ${RAIO} 0 1 1 ${RAIO * 2} 0 a${RAIO} ${RAIO} 0 1 1 -${RAIO * 2} 0`} fill="none" />
        <text>
          <textPath href="#selo-circulo" textLength={2 * Math.PI * RAIO} lengthAdjust="spacing">
            {TEXTO.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <Brilho tamanho={26} className="selo__brilho" />
    </div>
  );
}
