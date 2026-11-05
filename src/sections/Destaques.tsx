import { ArrowUpRight } from "lucide-react";
import { LinkPagina } from "../components/LinkPagina";
import { atraso } from "../revelar";
import { paginas } from "../rotas";

export function Destaques() {
  return (
    <section className="secao">
      <div className="container">
        <div className="secao__cabeca" data-revelar>
          <p className="rotulo">Conheça o Sussurro</p>
          <h2 className="titulo-l">
            Tudo o que você precisa saber, em <em>quatro páginas</em>.
          </h2>
        </div>
        <ul className="destaques">
          {paginas.slice(1).map((p, i) => (
            <li key={p.id} data-revelar style={atraso(i * 90)}>
              <LinkPagina para={p.id} className="destaque">
                <span className="destaque__numero" aria-hidden="true">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3 className="destaque__titulo">{p.rotulo}</h3>
                <p className="destaque__resumo">{p.resumo}</p>
                <span className="destaque__ir">
                  Abrir página
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </LinkPagina>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
