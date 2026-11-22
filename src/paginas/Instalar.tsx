import { useEffect, useState, type ComponentType } from "react";
import { Check, Copy, ShieldAlert, ShieldCheck } from "lucide-react";
import icone from "../assets/icone-192.webp";
import { BotaoDownload } from "../components/BotaoDownload";
import { APK_CERTIFICADO, REQUISITOS, SITE_URL } from "../config";
import { descreverDownload, download } from "../download";
import { Abertura } from "../layout/Abertura";

const ENDERECO = SITE_URL.replace("https://", "");

const passos = [
  [
    "Baixe o arquivo",
    `Toque em “Baixar o Sussurro”. O navegador costuma avisar que arquivos APK podem ser perigosos: confirme só se o endereço no topo for ${ENDERECO}.`,
  ],
  [
    "Abra e autorize",
    "Toque na notificação do download ou procure o arquivo na pasta Downloads. O Android vai pedir permissão para o navegador instalar apps: toque em “Configurações” e ative “Permitir desta fonte”.",
  ],
  [
    "Instale e retire a permissão",
    "Volte e toque em “Instalar”. Se o Play Protect quiser verificar o app, deixe. Depois, volte às configurações e desative “Permitir desta fonte”.",
  ],
];

type Aparelho = "android" | "ios" | "outro" | null;

function useAparelho() {
  const [tipo, setTipo] = useState<Aparelho>(null);
  useEffect(() => {
    const agente = navigator.userAgent;
    if (/Android/i.test(agente)) setTipo("android");
    else if (/iPhone|iPad|iPod/i.test(agente)) setTipo("ios");
    else setTipo("outro");
  }, []);
  return tipo;
}

function QrDaPagina() {
  const [Qr, setQr] = useState<ComponentType<{ texto: string; rotulo: string }> | null>(null);
  useEffect(() => {
    import("../components/QrCode").then((m) => setQr(() => m.QrCode));
  }, []);
  return (
    <div className="cartao__qr">
      <div className="qr">{Qr && <Qr texto={`${SITE_URL}/instalar/`} rotulo="QR code com o endereço desta página" />}</div>
      <p>
        <strong>Está no computador?</strong> O app só instala em celular Android. Aponte a câmera do celular para abrir
        esta página nele.
      </p>
    </div>
  );
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
        <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
      </button>
      <p>Certificado da assinatura (SHA-256):</p>
      <code>{APK_CERTIFICADO}</code>
    </details>
  );
}

export function PaginaInstalar() {
  const tipo = useAparelho();

  return (
    <>
      <Abertura
        titulo="Baixar e instalar no Android"
        lead="O Sussurro ainda não está na Play Store. A instalação é feita pelo arquivo do app (APK), que só deve ser baixado deste site."
      />

      <section className="secao secao--colada">
        <div className="container instalar">
          <div className="cartao">
            <div className="cartao__topo">
              <img src={icone} alt="" width={64} height={64} />
              <p>
                <strong>Sussurro</strong>
                <span>{descreverDownload() ?? "Para Android, em fase de testes"}</span>
                <span>{REQUISITOS}</span>
              </p>
            </div>
            <BotaoDownload rotulo="Baixar o Sussurro" />

            {!download && <p className="cartao__nota">Quando a versão pública sair, o download aparece aqui.</p>}
            {tipo === "ios" && <p className="cartao__nota">O Sussurro ainda não tem versão para iPhone.</p>}
            {tipo === "outro" && <QrDaPagina />}
            {download && <Integridade sha256={download.sha256} />}
          </div>

          <div>
            <h2 className="titulo-m">Passo a passo</h2>
            <ol className="passos">
              {passos.map(([titulo, texto]) => (
                <li key={titulo} className="passo">
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </li>
              ))}
            </ol>
            <div className="aviso">
              <ShieldCheck size={22} aria-hidden="true" />
              <p>
                <strong>O Play Protect mostrou um alerta?</strong> Não desative a proteção do celular. Confira se o arquivo
                veio de {ENDERECO} e, se puder, o SHA-256. Se o alerta for só de app desconhecido, “Mais detalhes” traz a
                opção de instalar mesmo assim. Se ele bloquear, não insista: o 190, o 180 e o 153 funcionam sem o app.
              </p>
            </div>
            <div className="aviso">
              <ShieldAlert size={22} aria-hidden="true" />
              <p>
                <strong>Outra pessoa usa o seu celular?</strong> O download aparece no histórico do navegador e o arquivo
                fica na pasta Downloads. Depois de instalar, apague os dois. Dentro do app, o modo discreto troca o ícone
                e o nome.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
