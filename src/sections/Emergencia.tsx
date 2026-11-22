import { Phone } from "lucide-react";
import { canais } from "../canais";

export function Emergencia() {
  return (
    <section className="emergencia" aria-labelledby="titulo-emergencia">
      <div className="container">
        <h2 id="titulo-emergencia" className="emergencia__titulo">
          Para quem ligar, sem esperar pelo app
        </h2>
        <ul className="emergencia__lista">
          {canais.map((c) => (
            <li key={c.numero}>
              <a className={`canal${c.destaque ? " canal--destaque" : ""}`} href={`tel:${c.numero}`}>
                <span className="canal__numero">{c.numero}</span>
                <span className="canal__texto">
                  <strong>{c.nome}</strong>
                  <span>{c.detalhe}</span>
                </span>
                <span className="canal__icone">
                  <Phone size={18} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
