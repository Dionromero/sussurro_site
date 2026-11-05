import { Check, EyeOff, History, LogOut, X, type LucideIcon } from "lucide-react";
import { Abertura } from "../layout/Abertura";
import { atraso } from "../revelar";

const pontos = [
  ["Sem conta e sem login.", "O app não pede nome, e-mail nem o seu telefone."],
  ["Contatos só no aparelho.", "As pessoas de confiança ficam guardadas com criptografia no próprio celular. Nada vai para o servidor."],
  ["Localização só quando você decide.", "Ela serve para achar os locais próximos e, se você quiser, para avisar quem você escolher. O app sempre pergunta antes de enviar."],
  ["Sem anúncios e sem rastreadores.", "Nem no app, nem neste site."],
];

const limites = [
  ["Não chama a polícia sozinho.", "Ele abre a ligação para o 190 ou o 180 e você confirma. Também não registra boletim de ocorrência."],
  ["Não substitui o atendimento.", "Polícia, Justiça, saúde e assistência social continuam sendo o caminho. O app ajuda a chegar até eles."],
  ["Não fica invisível.", "Quem desbloqueia o celular e abre o app vê o que ele é, mesmo com o disfarce no ícone."],
];

const site: { icone: LucideIcon; titulo: string; texto: string }[] = [
  {
    icone: LogOut,
    titulo: "Saída rápida",
    texto: "O botão “Sair rápido” no topo, ou Esc três vezes, troca esta página por uma pesquisa comum na hora.",
  },
  {
    icone: EyeOff,
    titulo: "Nada de terceiros",
    texto: "Sem analytics, sem cookies, sem fontes do Google. Até o QR code da página de instalação é gerado no seu navegador.",
  },
  {
    icone: History,
    titulo: "Sem rastro no “voltar”",
    texto:
      "Trocar de página aqui não acumula entradas no botão voltar, então ele não traz o site de volta depois da saída rápida. O histórico do navegador ainda registra a visita: se precisar, apague-o ou use uma aba anônima.",
  },
];

export function PaginaPrivacidade() {
  return (
    <>
      <Abertura
        titulo={
          <>
            Guarda o mínimo. E o que guarda fica <em>com você</em>.
          </>
        }
        lead="Quem precisa deste app muitas vezes divide o celular com quem a agride. Por isso ele não pede cadastro e mantém os seus dados no próprio aparelho."
      />

      <section className="secao secao--colada" aria-labelledby="titulo-dados">
        <div className="container">
          <h2 id="titulo-dados" className="rotulo">
            Como o app trata os seus dados
          </h2>
          <ul className="pontos">
            {pontos.map(([titulo, texto], i) => (
              <li key={titulo} className="ponto" data-revelar style={atraso(i * 80)}>
                <span className="ponto__marca">
                  <Check size={18} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--papel">
        <div className="container limites">
          <div className="secao__cabeca" data-revelar>
            <p className="rotulo">Limites</p>
            <h2 className="titulo-l">
              E o que ele <em>não</em> faz.
            </h2>
          </div>
          <ul className="limites__lista">
            {limites.map(([titulo, texto], i) => (
              <li key={titulo} data-revelar style={atraso(i * 80)}>
                <span className="limites__marca">
                  <X size={16} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__cabeca" data-revelar>
            <p className="rotulo">Este site</p>
            <h2 className="titulo-l">
              E este site segue a <em>mesma regra</em>.
            </h2>
          </div>
          <ul className="cuidados">
            {site.map(({ icone: Icone, titulo, texto }, i) => (
              <li key={titulo} className="cuidado" data-revelar style={atraso(i * 80)}>
                <Icone size={22} aria-hidden="true" className="cuidado__icone" />
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
