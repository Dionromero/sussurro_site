import { canais } from "../canais";

export function FaixaEmergencia() {
  return (
    <aside className="faixa" aria-label="Telefones de emergência">
      <div className="container faixa__linha">
        <p className="faixa__titulo">Em perigo agora?</p>
        <ul className="faixa__lista">
          {canais.map((c) => (
            <li key={c.numero}>
              <a href={`tel:${c.numero}`} className={`faixa__canal${c.destaque ? " faixa__canal--destaque" : ""}`}>
                <strong>{c.numero}</strong>
                <span>{c.curto}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
