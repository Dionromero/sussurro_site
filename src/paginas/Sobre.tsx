import { ArrowRight } from "lucide-react";
import { LinkPagina } from "../components/LinkPagina";
import { Abertura } from "../layout/Abertura";
import { atraso } from "../revelar";

const fichas = [
  { rotulo: "Quem faz", valor: "Estudantes da Gran Faculdade", texto: "Em um projeto de extensão, como ação social." },
  { rotulo: "Onde", valor: "Curitiba/PR", texto: "O piloto começa aqui, com a rede de proteção que já existe na cidade." },
  { rotulo: "Quanto custa", valor: "Nada", texto: "Gratuito, sem anúncios e sem cadastro." },
];

const fontes = ["Mapa oficial do IPPUC", "Prefeitura de Curitiba", "Governo do Paraná"];

export function PaginaSobre() {
  return (
    <>
      <Abertura
        titulo={
          <>
            Um projeto de extensão <em>universitária</em>.
          </>
        }
        lead="O Sussurro nasceu como ação social de estudantes da Gran Faculdade, em um projeto de extensão, com o objetivo de aproximar mulheres em situação de violência dos serviços que já existem na cidade. O piloto começa em Curitiba."
      />

      <section className="secao secao--colada">
        <div className="container">
          <ul className="fichas">
            {fichas.map(({ rotulo, valor, texto }, i) => (
              <li key={rotulo} className="ficha" data-revelar style={atraso(i * 90)}>
                <span className="ficha__rotulo">{rotulo}</span>
                <strong className="ficha__valor">{valor}</strong>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--papel">
        <div className="container sobre">
          <div data-revelar>
            <p className="rotulo">De onde vêm os dados</p>
            <h2 className="titulo-l">
              Endereços e telefones de <em>fontes públicas</em>.
            </h2>
          </div>
          <div className="sobre__texto" data-revelar style={atraso(120)}>
            <p>
              Os endereços e telefones vêm de fontes públicas, como o mapa oficial do IPPUC e os sites da Prefeitura e
              do Governo do Paraná, e são revisados periodicamente. Encontrou algo desatualizado? Avise a equipe para
              corrigirmos.
            </p>
            <ul className="fontes" aria-label="Fontes">
              {fontes.map((fonte) => (
                <li key={fonte}>{fonte}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="limite-final" data-revelar>
            <p className="limite-final__texto">
              Este app orienta e conecta. Ele não substitui o 190, o 180 nem o <em>atendimento especializado</em>.
            </p>
            <LinkPagina para="privacidade" className="link-seta">
              Ver o que o app não faz
              <ArrowRight size={18} aria-hidden="true" />
            </LinkPagina>
          </div>
        </div>
      </section>
    </>
  );
}
