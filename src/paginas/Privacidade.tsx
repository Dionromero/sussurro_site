import { Abertura } from "../layout/Abertura";
import { CONTATO_EMAIL, POLITICA_DATA } from "../config";

const dados = [
  {
    titulo: "Pessoas de confiança",
    oque: "Nome e telefone de até cinco pessoas que você cadastra.",
    onde: "Ficam só no aparelho, com criptografia. Não vão para o servidor.",
    tempo: "Até você apagar ou desinstalar o app.",
  },
  {
    titulo: "Localização para achar apoio por perto",
    oque: "A posição do aparelho, depois que você dá a permissão ao Android. Com a permissão ativa, o app usa a posição ao abrir e a cada busca.",
    onde: "Servidor do projeto, no Supabase, que calcula as distâncias.",
    tempo: "O projeto não grava essa posição.",
  },
  {
    titulo: "Localização ao vivo",
    oque: "Só quando você inicia: posição, precisão e horário, a cada 15 segundos, por 15, 30 ou 60 minutos. No começo, o app também envia a posição ao Nominatim, do OpenStreetMap, para escrever o endereço na mensagem.",
    onde: "Servidor do projeto, no Supabase, e Nominatim. Quem tem o link vê a posição na página de acompanhamento deste site.",
    tempo: "Só a última posição fica guardada, e ela é apagada quando você para ou o tempo acaba. O registro da sessão, com um código diário gerado a partir do IP para limitar abusos, sai do servidor cerca de uma hora depois.",
  },
  {
    titulo: "Rotas",
    oque: "Sua posição e o destino, quando você pede um caminho.",
    onde: "Servidor do projeto, que consulta o OpenRouteService (a pé e de carro) ou o Google (ônibus), sem enviar o seu nome nem o seu IP.",
    tempo: "O projeto não grava. Cada serviço segue a própria política.",
  },
  {
    titulo: "Mapa",
    oque: "O trecho do mapa que está na tela e o IP do aparelho, como em qualquer site.",
    onde: "OpenStreetMap e OpenFreeMap, no app. OpenStreetMap, na página de acompanhamento.",
    tempo: "Definido por esses serviços.",
  },
  {
    titulo: "Mensagens, Google Maps e Street View",
    oque: "O texto com o link do mapa, ou o local que você escolhe abrir.",
    onde: "WhatsApp ou SMS, para a pessoa escolhida; Google, quando você toca para abrir o mapa ou a fachada.",
    tempo: "A mensagem fica na conversa até alguém apagar. O Google segue a própria política.",
  },
  {
    titulo: "Este site",
    oque: "IP, navegador e horário do acesso, registrados pela hospedagem para entregar a página e evitar ataques. Não há cookies, analytics nem formulários.",
    onde: "Vercel, que hospeda o site.",
    tempo: "Definido pela Vercel.",
  },
  ...(CONTATO_EMAIL
    ? [
        {
          titulo: "E-mails para a equipe",
          oque: "Seu endereço e o que você escrever. Não envie documentos nem detalhes que coloquem você em risco.",
          onde: "Gmail, do Google, lido pela equipe do projeto.",
          tempo: "Até o assunto ser resolvido. Você pode pedir para apagar antes.",
        },
      ]
    : []),
];

const limites = [
  ["Não chama a polícia sozinho.", "Ele abre a ligação para o 190 ou o 180 e você confirma. Também não registra boletim de ocorrência."],
  ["Não substitui o atendimento.", "Polícia, Justiça, saúde e assistência social continuam sendo o caminho. O app ajuda a chegar até eles."],
  ["Não fica invisível.", "Quem desbloqueia o celular e abre o app vê o que ele é, mesmo com o disfarce no ícone."],
];

const dataPorExtenso = new Date(`${POLITICA_DATA}T12:00:00Z`).toLocaleDateString("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function PaginaPrivacidade() {
  return (
    <>
      <Abertura
        titulo="Política de privacidade"
        lead="Quem precisa deste app muitas vezes divide o celular com quem a agride. Por isso ele não pede cadastro. Mesmo assim, algumas funções precisam enviar dados para fora do aparelho, e esta página diz quais."
      />

      <section className="secao secao--colada" aria-labelledby="titulo-dados">
        <div className="container">
          <h2 id="titulo-dados" className="titulo-l">
            O que é usado e para onde vai
          </h2>
          <ul className="dados">
            {dados.map(({ titulo, oque, onde, tempo }) => (
              <li key={titulo} className="dado">
                <h3>{titulo}</h3>
                <dl>
                  <div>
                    <dt>O que é</dt>
                    <dd>{oque}</dd>
                  </div>
                  <div>
                    <dt>Para onde vai</dt>
                    <dd>{onde}</dd>
                  </div>
                  <div>
                    <dt>Por quanto tempo</dt>
                    <dd>{tempo}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--papel" aria-labelledby="titulo-lgpd">
        <div className="container politica">
          <h2 id="titulo-lgpd" className="titulo-l">
            Responsáveis e seus direitos
          </h2>
          <div className="politica__texto">
            <h3>Quem responde pelos dados</h3>
            <p>
              O Sussurro é um projeto de extensão de estudantes da Gran Faculdade, em Curitiba/PR.{" "}
              {CONTATO_EMAIL ? (
                <>
                  Dúvidas e pedidos: <a href={`mailto:${CONTATO_EMAIL}`}>{CONTATO_EMAIL}</a>. Essa caixa não é
                  acompanhada 24 horas: em perigo, ligue <a href="tel:190">190</a>; para orientação,{" "}
                  <a href="tel:180">180</a>.
                </>
              ) : (
                "O e-mail para dúvidas e pedidos ainda será publicado aqui."
              )}
            </p>
            <h3>Por que os dados são usados</h3>
            <p>
              A localização e o compartilhamento dependem do seu consentimento (art. 7º, I, da LGPD), que você pode
              retirar nas permissões do Android ou parando o compartilhamento. Os registros técnicos contra abusos e
              ataques se apoiam no legítimo interesse (art. 7º, IX). Nada é vendido nem usado para publicidade.
            </p>
            <h3>O que você pode pedir</h3>
            <p>
              Confirmação, acesso, correção, exclusão e informação sobre com quem os dados são compartilhados, como prevê
              o art. 18 da LGPD. Como não há cadastro, o projeto normalmente não consegue ligar um dado a uma pessoa. Você
              também pode reclamar à ANPD, a Autoridade Nacional de Proteção de Dados.
            </p>
            <h3>Dados fora do Brasil</h3>
            <p>
              Supabase, Vercel, Google, OpenStreetMap, OpenFreeMap e OpenRouteService podem processar dados em outros
              países.
            </p>
            <h3>Menores de 18 anos</h3>
            <p>
              O app não pede idade e não é feito para crianças. Adolescentes em risco também podem ligar para o 190 ou para
              o Disque 100.
            </p>
            <h3>Saída rápida e histórico</h3>
            <p>
              O botão “Sair rápido”, ou Esc três vezes, troca a página por uma pesquisa no Google. Trocar de página aqui
              não acumula entradas no botão voltar, mas o histórico do navegador ainda registra a visita. Se precisar,
              apague-o ou use uma aba anônima.
            </p>
            <p className="politica__data">
              Em vigor desde <time dateTime={POLITICA_DATA}>{dataPorExtenso}</time>. Quando algo mudar, esta página e esta
              data mudam.
            </p>
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="titulo-limites">
        <div className="container limites">
          <h2 id="titulo-limites" className="titulo-l">
            O que o app não faz
          </h2>
          <ul className="limites__lista">
            {limites.map(([titulo, texto]) => (
              <li key={titulo}>
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
