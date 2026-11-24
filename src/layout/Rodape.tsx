import { Phone } from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";
import { canais } from "../canais";
import { LinkPagina } from "../components/LinkPagina";
import { paginas } from "../rotas";

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div className="rodape__marca">
            <img src={simbolo} alt="" width={52} height={52} loading="lazy" />
            <p className="rodape__aviso">
              Este app orienta e conecta. Ele não substitui o 190, o 180 nem o atendimento especializado.
            </p>
          </div>

          <nav className="rodape__coluna" aria-label="Mapa do site">
            <h2>Páginas</h2>
            <ul>
              {paginas.map((p) => (
                <li key={p.id}>
                  <LinkPagina para={p.id}>{p.rotulo}</LinkPagina>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rodape__coluna">
            <h2>Em perigo agora?</h2>
            <ul className="rodape__telefones">
              {canais.map((c) => (
                <li key={c.numero}>
                  <a href={`tel:${c.numero}`}>
                    <Phone size={14} aria-hidden="true" />
                    <strong>{c.numero}</strong>
                    <span>{c.nome}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rodape__coluna">
            <h2>Saída rápida</h2>
            <p>
              Aperte <kbd>Esc</kbd> três vezes e esta página vira uma pesquisa comum na hora.
            </p>
          </div>
        </div>

        <div className="rodape__base">
          <p>© 2026 Sussurro · Projeto de extensão de estudantes da Gran Faculdade · Curitiba/PR</p>
          <p>
            <LinkPagina para="privacidade">Política de privacidade</LinkPagina>
          </p>
        </div>
      </div>
    </footer>
  );
}
