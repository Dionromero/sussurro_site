import { useState } from "react";
import { Check, Copy, ShieldAlert } from "lucide-react";
import icone from "../assets/icone-192.png";
import { BotaoDownload } from "../components/BotaoDownload";
import { QrCode } from "../components/QrCode";
import { descreverDownload, download } from "../download";
import { Abertura } from "../layout/Abertura";
import { atraso } from "../revelar";

const passos = [
  [
    "Baixe o arquivo",
    "Toque em “Baixar o Sussurro”. Se o navegador avisar que o arquivo pode ser perigoso, confirme o download: o aviso aparece para qualquer app de fora da Play Store.",
  ],
  [
    "Abra e autorize",
    "Toque na notificação do download ou procure o arquivo na pasta Downloads. O Android vai pedir permissão para o navegador instalar apps: toque em “Configurações” e ative “Permitir desta fonte”.",
  ],
  [
    "Instale",
    "Volte e toque em “Instalar”. Em alguns segundos o Sussurro aparece na lista de apps. Se o Play Protect quiser verificar o app antes, pode deixar.",
  ],
];

function aparelho() {
  const agente = navigator.userAgent;
  if (/Android/i.test(agente)) return "android";
  if (/iPhone|iPad|iPod/i.test(agente)) return "ios";
  return "outro";
}

function Integridade({ sha256 }: { sha256: string }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(sha256);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem permissão: o código continua na tela para copiar à mão
    }
  };

  return (
    <details className="integridade">
      <summary>Conferir a integridade do arquivo</summary>
      <p>O SHA-256 do arquivo baixado deve ser exatamente este. Se for diferente, não instale.</p>
      <code>{sha256}</code>
      <button type="button" className="integridade__copiar" onClick={copiar}>
        {copiado ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copiado ? "Copiado" : "Copiar"}
      </button>
    </details>
  );
}

export function PaginaInstalar() {
  const tipo = aparelho();
  const estaPagina = window.location.href.split("#")[0];

  return (
    <>
      <Abertura
        titulo={
          <>
            Três passos, direto <em>por aqui</em>.
          </>
        }
        lead="O Sussurro ainda não está na Play Store. Enquanto isso, a instalação é feita pelo arquivo do app (APK), que só deve ser baixado desta página."
      />

      <section className="secao secao--colada">
        <div className="container instalar">
          <div className="cartao" data-revelar>
            <div className="cartao__topo">
              <img src={icone} alt="" width={64} height={64} />
              <p>
                <strong>Sussurro</strong>
                <span>{descreverDownload("Android") ?? "Para Android · em fase de testes"}</span>
              </p>
            </div>
            <BotaoDownload rotulo="Baixar o Sussurro" />

            {!download && <p className="cartao__nota">Quando a versão pública sair, o download aparece aqui.</p>}
            {!download && import.meta.env.DEV && (
              <p className="cartao__dev">
                Só em desenvolvimento: coloque o APK em <code>public/downloads/</code> com a versão no nome, por
                exemplo <code>sussurro-0.1.0.apk</code>. O botão ativa sozinho.
              </p>
            )}
            {tipo === "ios" && <p className="cartao__nota">O Sussurro ainda não tem versão para iPhone.</p>}
            {tipo === "outro" && (
              <div className="cartao__qr">
                <QrCode texto={estaPagina} rotulo="QR code com o endereço desta página" />
                <p>
                  <strong>Está no computador?</strong> O app só instala em celular Android. Aponte a câmera do celular
                  para abrir esta página nele.
                </p>
              </div>
            )}
            {download && <Integridade sha256={download.sha256} />}
          </div>

          <div>
            <h2 className="rotulo">Passo a passo</h2>
            <ol className="passos">
              {passos.map(([titulo, texto], i) => (
                <li key={titulo} className="passo" data-revelar style={atraso(i * 90)}>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
            <div className="aviso" data-revelar>
              <ShieldAlert size={22} aria-hidden="true" />
              <p>
                <strong>Outra pessoa usa o seu celular?</strong> O download aparece no histórico do navegador e o
                arquivo fica na pasta Downloads. Depois de instalar, apague os dois. Dentro do app, o modo discreto
                troca o ícone e o nome.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
