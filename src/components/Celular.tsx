import { LocateFixed, LogOut, Phone, SlidersHorizontal } from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";

const pinos = [
  { x: 58, y: 44, cor: "#7a2e3a" },
  { x: 118, y: 30, cor: "#2f5d62" },
  { x: 196, y: 52, cor: "#4f6b4a" },
  { x: 88, y: 104, cor: "#2f5d62" },
  { x: 222, y: 112, cor: "#7a2e3a" },
  { x: 170, y: 126, cor: "#4f6b4a" },
];

export function Celular() {
  return (
    <figure
      className="celular"
      role="img"
      aria-label="Ilustração da tela inicial do Sussurro: saudação, botão para ligar 190 e mapa com os locais de apoio mais próximos."
    >
      <div className="celular__tela" aria-hidden="true">
        <div className="tela__topo">
          <img src={simbolo} alt="" width={30} height={30} />
          <span className="tela__marca">SUSSURRO</span>
          <span className="tela__sair">
            <LogOut size={11} />
            Sair
          </span>
        </div>

        <p className="tela__saudacao">Boa tarde.</p>
        <p className="tela__texto">
          Você não está sozinha. Aqui estão caminhos de apoio perto de você, e cada passo é decisão sua.
        </p>

        <div className="tela__emergencia">
          <div>
            <span className="tela__sobretitulo">EM RISCO AGORA</span>
            <strong>Ligar 190</strong>
            <span>Polícia Militar. Você confirma antes de ligar.</span>
          </div>
          <span className="tela__fone">
            <Phone size={16} />
          </span>
        </div>

        <div className="tela__linha">
          <strong>Apoio perto de você</strong>
          <span>Ver lista</span>
        </div>
        <div className="tela__filtros">
          <span className="tela__chip tela__chip--ativo">
            <LocateFixed size={11} />
            Mais próximos
          </span>
          <span className="tela__chip">
            <SlidersHorizontal size={11} />
            Filtros
          </span>
        </div>

        <svg className="tela__mapa" viewBox="0 0 272 150">
          <rect width="272" height="150" fill="#ede5d8" />
          <path d="M-10 96 C40 70 70 120 130 92 S230 60 290 84 V160 H-10 Z" fill="#e2ecea" />
          <path d="M150 -10 C190 10 240 0 290 26 V-10 Z" fill="#e7ede2" />
          <g fill="none" stroke="#fffcf7" strokeLinecap="round">
            <path d="M-10 62 L290 20" strokeWidth="8" />
            <path d="M70 -10 L104 160" strokeWidth="8" />
            <path d="M-10 124 L290 96" strokeWidth="5" />
            <path d="M156 -10 L182 160" strokeWidth="5" />
            <path d="M228 -10 L250 160" strokeWidth="4" />
            <path d="M14 -10 L36 160" strokeWidth="4" />
          </g>
          <circle cx="140" cy="76" r="15" fill="#2f5d62" opacity="0.16" />
          <circle cx="140" cy="76" r="6" fill="#2f5d62" stroke="#fffcf7" strokeWidth="2.5" />
          {pinos.map(({ x, y, cor }) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <path d="M0 0 C-9 -11 -8 -22 0 -22 C8 -22 9 -11 0 0 Z" fill={cor} stroke="#fffcf7" strokeWidth="1.5" />
              <circle cy="-14" r="3" fill="#fffcf7" />
            </g>
          ))}
        </svg>
        <p className="tela__legenda">Os 6 locais mais próximos de você. Toque num pino.</p>
      </div>
    </figure>
  );
}
