import { ArrowUpRight, Download, GraduationCap, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { LinkPagina } from "../components/LinkPagina";
import { atraso } from "../revelar";
import { paginas, type IdPagina } from "../rotas";

const visual: Partial<Record<IdPagina, { icone: LucideIcon; cor: "vinho" | "tinta" | "musgo" }>> = {
  "o-app": { icone: Smartphone, cor: "vinho" },
  privacidade: { icone: ShieldCheck, cor: "tinta" },
  instalar: { icone: Download, cor: "musgo" },
  sobre: { icone: GraduationCap, cor: "vinho" },
};

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
          {paginas.slice(1).map((p, i) => {
            const { icone: Icone, cor } = visual[p.id]!;
            return (
              <li key={p.id} data-revelar style={atraso(i * 90)}>
                <LinkPagina para={p.id} className={`destaque destaque--${cor}`}>
                  <span className="destaque__topo">
                    <span className="destaque__icone">
                      <Icone size={22} aria-hidden="true" />
                    </span>
                    <span className="destaque__numero" aria-hidden="true">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="destaque__titulo">{p.rotulo}</h3>
                  <p className="destaque__resumo">{p.resumo}</p>
                  <span className="destaque__ir">
                    Abrir página
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </LinkPagina>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
