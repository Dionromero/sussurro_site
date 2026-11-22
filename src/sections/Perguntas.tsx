import { perguntas } from "../perguntas";

export function Perguntas() {
  return (
    <section className="secao secao--papel" aria-labelledby="titulo-perguntas">
      <div className="container perguntas">
        <h2 id="titulo-perguntas" className="titulo-l">
          Perguntas frequentes
        </h2>
        <div>
          {perguntas.map(({ pergunta, resposta }, i) => (
            <details key={pergunta} className="pergunta" open={i === 0}>
              <summary>
                <h3>{pergunta}</h3>
              </summary>
              <p>{resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
