import { ArrowRight, ExternalLink } from "lucide-react";
import { LinkPagina } from "../components/LinkPagina";
import { CONTATO_EMAIL } from "../config";
import { Abertura } from "../layout/Abertura";

const fichas = [
  { rotulo: "Quem faz", valor: "Estudantes da Gran Faculdade", texto: "Em um projeto de extensão, como ação social." },
  { rotulo: "Onde", valor: "Curitiba/PR", texto: "O piloto usa a rede de proteção que já existe na cidade." },
  { rotulo: "Quanto custa", valor: "Nada", texto: "Sem anúncios, sem cadastro e sem versão paga." },
];

const fontes = [
  { nome: "Mapa oficial do IPPUC", usado: "Endereços e coordenadas", url: "https://geocuritiba.ippuc.org.br/" },
  {
    nome: "Prefeitura de Curitiba",
    usado: "Rede de atenção às mulheres",
    url: "https://mulhereigualdade.curitiba.pr.gov.br/conteudo/rede-de-atencao-as-mulheres-em-situacao-de-violencias/12",
  },
  {
    nome: "Tribunal de Justiça do Paraná",
    usado: "Onde procurar ajuda",
    url: "https://www.tjpr.jus.br/web/cevid/onde-procurar-ajuda",
  },
  {
    nome: "Lei Maria da Penha",
    usado: "Lei 11.340/2006, base dos guias",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm",
  },
];

export function PaginaSobre() {
  return (
    <>
      <Abertura
        titulo="Um projeto de extensão universitária"
        lead="O Sussurro nasceu como ação social de estudantes da Gran Faculdade, para aproximar mulheres em situação de violência dos serviços que já existem em Curitiba."
      />

      <section className="secao secao--colada">
        <div className="container">
          <ul className="fichas">
            {fichas.map(({ rotulo, valor, texto }) => (
              <li key={rotulo} className="ficha">
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
          <div>
            <h2 className="titulo-l">De onde vêm os endereços e telefones</h2>
            <p className="secao__lead">
              A base tem 90 locais. No app, cada um mostra a data em que o dado foi verificado; a última conferência geral
              foi em setembro de 2026. Os números 190, 180 e 153 vêm dos órgãos responsáveis.
            </p>
            {CONTATO_EMAIL && (
              <p className="secao__lead">
                Encontrou algo desatualizado? Escreva para <a href={`mailto:${CONTATO_EMAIL}`}>{CONTATO_EMAIL}</a>.
              </p>
            )}
          </div>
          <ul className="fontes" aria-label="Fontes">
            {fontes.map(({ nome, usado, url }) => (
              <li key={nome}>
                <a href={url} rel="noreferrer">
                  <span>
                    <strong>{nome}</strong>
                    {usado}
                  </span>
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao">
        <div className="container limite-final">
          <p className="limite-final__texto">
            O Sussurro orienta e conecta. Ele não substitui o 190, o 180 nem o atendimento especializado.
          </p>
          <LinkPagina para="privacidade" className="link-seta">
            Ver o que o app não faz
            <ArrowRight size={18} aria-hidden="true" />
          </LinkPagina>
        </div>
      </section>
    </>
  );
}
