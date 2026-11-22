import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Lock,
  MapPin,
  MapPinOff,
  Navigation,
  Phone,
  Radio,
  RefreshCw,
  ShieldAlert,
  WifiOff,
} from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";
import { LinkSair } from "../components/LinkSair";
import { hrefDe } from "../rotas";
import { buscarPosicao, modoDemoDoLink, posicaoDemo, tokenDoLink, type Posicao } from "./api";
import { Mapa } from "./Mapa";

const INTERVALO_MS = 15_000;

function tempoDesde(iso: string | null, agora: number): string {
  if (!iso) return "";
  const s = Math.max(0, Math.round((agora - new Date(iso).getTime()) / 1000));
  if (s < 10) return "agora mesmo";
  if (s < 60) return `há ${s} s`;
  const m = Math.round(s / 60);
  return m < 60 ? `há ${m} min` : `há ${Math.round(m / 60)} h`;
}

function tempoAte(iso: string | null, agora: number): string {
  if (!iso) return "";
  const ms = new Date(iso).getTime() - agora;
  if (ms <= 0) return "encerrando…";
  const m = Math.ceil(ms / 60_000);
  return m <= 1 ? "menos de 1 min" : `${m} min`;
}

function hora(iso: string | null): string {
  return iso ? new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";
}

function formatarCoordenadas(lat: number, lon: number): string {
  return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
}

export function Acompanhar() {
  const [token, setToken] = useState<string | null>(tokenDoLink);
  const [modoDemo, setModoDemo] = useState<boolean>(modoDemoDoLink);
  const [dados, setDados] = useState<Posicao | null>(null);
  const [falhou, setFalhou] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [agora, setAgora] = useState(Date.now());

  const passoDemo = useRef(0);
  const cicloRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    const aoMudarHash = () => {
      setToken(tokenDoLink());
      setModoDemo(modoDemoDoLink());
      setDados(null);
      setFalhou(false);
    };
    window.addEventListener("hashchange", aoMudarHash);
    return () => window.removeEventListener("hashchange", aoMudarHash);
  }, []);

  useEffect(() => {
    if (!token && !modoDemo) return;
    let parar = false;
    let timer: number | undefined;
    const controle = new AbortController();

    const agendar = (ms = INTERVALO_MS) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => void ciclo(), ms);
    };

    const ciclo = async () => {
      setAtualizando(true);
      try {
        const p = modoDemo
          ? posicaoDemo(passoDemo.current++)
          : await buscarPosicao(token!, controle.signal);
        if (parar) return;
        setDados(p);
        setFalhou(false);
        setAgora(Date.now());
        if (p.status === "ativo" || p.status === "aguardando") {
          agendar(modoDemo ? 6_000 : INTERVALO_MS);
        }
      } catch {
        if (parar) return;
        setFalhou(true);
        agendar(INTERVALO_MS);
      } finally {
        if (!parar) setAtualizando(false);
      }
    };

    cicloRef.current = ciclo;
    void ciclo();
    return () => {
      parar = true;
      cicloRef.current = null;
      controle.abort();
      window.clearTimeout(timer);
    };
  }, [token, modoDemo]);

  useEffect(() => {
    const t = window.setInterval(() => setAgora(Date.now()), 5_000);
    return () => window.clearInterval(t);
  }, []);

  const nome = dados?.label?.trim() || "Sua pessoa de confiança";
  const temPosicao = dados?.status === "ativo" && dados.latitude != null && dados.longitude != null;
  const desatualizado =
    temPosicao && dados.updated_at != null && agora - new Date(dados.updated_at).getTime() > 2 * 60_000;

  const copiarLocalizacao = async () => {
    if (!temPosicao || dados.latitude == null || dados.longitude == null) return;
    try {
      await navigator.clipboard.writeText(formatarCoordenadas(dados.latitude, dados.longitude));
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2_500);
    } catch {
      // sem permissão: as coordenadas continuam na tela
    }
  };

  return (
    <div className="acomp">
      <header className="acomp__topo">
        <div className="acomp__topo-linha">
          <div className="acomp__marca">
            <img src={simbolo} alt="" width={34} height={34} />
            <span>Sussurro</span>
          </div>
          <LinkSair />
        </div>
      </header>

      <main className="acomp__corpo">
        {modoDemo && (
          <div className="acomp__banner acomp__banner--info" role="status">
            <Radio size={18} aria-hidden="true" />
            <span>
              <strong>Modo demonstração:</strong> exibindo um trajeto simulado em Curitiba. Links reais do app carregam
              a localização ao vivo.
            </span>
          </div>
        )}

        {!token && !modoDemo && (
          <Aviso
            icone={<MapPinOff size={22} />}
            titulo="Link incompleto"
            texto="Abra o link exatamente como você recebeu no WhatsApp ou SMS, sem cortar a parte depois do #."
          />
        )}

        {(token || modoDemo) && !dados && !falhou && (
          <p className="acomp__carregando" role="status">
            Carregando localização…
          </p>
        )}

        {token && !dados && falhou && (
          <Aviso
            icone={<RefreshCw size={22} />}
            titulo="Sem conexão"
            texto="Não conseguimos buscar a localização agora. Tentando de novo a cada 15 segundos."
          />
        )}

        {dados?.status === "inexistente" && (
          <Aviso
            icone={<MapPinOff size={22} />}
            titulo="Compartilhamento não encontrado"
            texto="O link pode estar errado ou o compartilhamento já expirou e foi apagado do servidor."
          />
        )}

        {(dados?.status === "encerrado" || dados?.status === "expirado") && (
          <Aviso
            icone={<Clock size={22} />}
            titulo={dados.status === "encerrado" ? "Compartilhamento encerrado" : "O tempo do compartilhamento acabou"}
            texto={
              dados.status === "encerrado"
                ? `${nome} parou de compartilhar às ${hora(dados.updated_at)}. A localização foi apagada do servidor.`
                : `O prazo de compartilhamento encerrou às ${hora(dados.expires_at || dados.updated_at)}. A localização foi apagada do servidor.`
            }
          />
        )}

        {dados?.status === "aguardando" && (
          <Aviso
            icone={<RefreshCw size={22} />}
            titulo="Aguardando a primeira localização"
            texto={`${nome} começou a compartilhar. O ponto aparece aqui assim que o celular enviar a posição (expira em ${tempoAte(dados.expires_at, agora)}).`}
          />
        )}

        {temPosicao && (
          <>
            {falhou && (
              <div className="acomp__banner acomp__banner--alerta" role="alert">
                <WifiOff size={18} aria-hidden="true" />
                <span>Sem conexão no momento. Exibindo a última posição recebida. Tentando reconectar…</span>
              </div>
            )}

            <section className="acomp__cabeca">
              <div className="acomp__status-linha">
                <span className={`acomp__selo${desatualizado ? " acomp__selo--alerta" : ""}`}>
                  <span className="acomp__pulso" aria-hidden="true" />
                  {desatualizado ? "Sem atualização recente" : "Localização ao vivo"}
                </span>
                <button
                  type="button"
                  className="acomp__atualizar"
                  onClick={() => void cicloRef.current?.()}
                  disabled={atualizando}
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  {atualizando ? "Atualizando…" : "Atualizar"}
                </button>
              </div>

              <h1 className="acomp__titulo">{nome} está compartilhando a localização com você.</h1>

              <div className="acomp__endereco-bloco">
                <MapPin size={18} className="acomp__endereco-icone" aria-hidden="true" />
                <div className="acomp__endereco-texto">
                  <strong>{formatarCoordenadas(dados.latitude!, dados.longitude!)}</strong>
                  <span className="acomp__coords">O endereço aproximado está na mensagem que você recebeu.</span>
                </div>
              </div>

              <p className={`acomp__meta${desatualizado ? " acomp__meta--alerta" : ""}`}>
                {desatualizado ? "Última posição " : "Atualizado "}
                {tempoDesde(dados.updated_at, agora)}
                {dados.accuracy_m ? ` · precisão de ${Math.round(dados.accuracy_m)} m` : ""}
                {" · termina em "}
                {tempoAte(dados.expires_at, agora)}
              </p>

              {desatualizado && (
                <p className="acomp__dica">
                  O celular dela pode estar sem internet, sem bateria ou com o GPS bloqueado.
                </p>
              )}
            </section>

            <Mapa latitude={dados.latitude!} longitude={dados.longitude!} precisao={dados.accuracy_m} />

            <div className="acomp__acoes">
              <button type="button" className="botao botao--primario" onClick={copiarLocalizacao}>
                {copiado ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                <span aria-live="polite">{copiado ? "Coordenadas copiadas" : "Copiar coordenadas"}</span>
              </button>
              <a
                className="botao botao--secundario"
                href={`https://www.google.com/maps/search/?api=1&query=${dados.latitude},${dados.longitude}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Google Maps
              </a>
              <a
                className="botao botao--secundario"
                href={`https://www.google.com/maps/dir/?api=1&destination=${dados.latitude},${dados.longitude}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Navigation size={18} aria-hidden="true" />
                Traçar rota
              </a>
              <a
                className="botao botao--secundario"
                href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${dados.latitude},${dados.longitude}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Compass size={18} aria-hidden="true" />
                Rua em 360°
              </a>
            </div>
          </>
        )}

        <section className="acomp__ajuda">
          <ShieldAlert size={22} aria-hidden="true" className="acomp__ajuda-icone" />
          <div className="acomp__ajuda-corpo">
            <strong>Acha que ela está em perigo?</strong>
            <p>
              {temPosicao
                ? "Ligue 190 e informe a rua que aparece no mapa ou as coordenadas."
                : "Ligue 190 e informe onde ela pode estar."}{" "}
              Não vá ao local sem apoio e não confronte o agressor.
            </p>
            <div className="acomp__emergencia-botoes">
              <a className="botao acomp__botao-190" href="tel:190">
                <Phone size={18} aria-hidden="true" />
                Ligar 190 (Polícia)
              </a>
              <a className="botao botao--secundario acomp__botao-180" href="tel:180">
                <Phone size={18} aria-hidden="true" />
                Ligar 180 (Central da Mulher)
              </a>
            </div>
          </div>
        </section>

        <section className="acomp__privacidade">
          <Lock size={16} aria-hidden="true" className="acomp__privacidade-icone" />
          <p>
            <strong>Mantenha este link em sigilo:</strong> qualquer pessoa com o link consegue ver a posição enquanto o
            compartilhamento estiver ativo. Esta página busca a posição no servidor do projeto (Supabase) e o mapa no
            OpenStreetMap, que recebe o seu IP e o trecho do mapa. Os botões do Google enviam a posição ao Google. Nada
            fica salvo no seu navegador. <a href={hrefDe("privacidade")}>Política de privacidade</a>
          </p>
        </section>
      </main>

      <footer className="acomp__rodape">
        A localização só fica disponível enquanto ela compartilha e é apagada ao encerrar.
      </footer>
    </div>
  );
}

function Aviso({ icone, titulo, texto }: { icone: ReactNode; titulo: string; texto: string }) {
  return (
    <section className="aviso-estado" role="status">
      <span className="aviso-estado__icone">{icone}</span>
      <h1>{titulo}</h1>
      <p>{texto}</p>
    </section>
  );
}
