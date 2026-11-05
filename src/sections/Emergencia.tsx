import { Phone } from "lucide-react";
import { canais } from "../canais";

export function Emergencia() {
  return (
    <section className="emergencia" aria-labelledby="titulo-emergencia">
      <div className="container">
        <div className="emergencia__cabeca">
          <p className="emergencia__sinal">
            <span aria-hidden="true" />
            Emergência
          </p>
          <h2 id="titulo-emergencia" className="emergencia__titulo">
            Está em perigo agora? Não espere pelo app.
          </h2>
        </div>
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
