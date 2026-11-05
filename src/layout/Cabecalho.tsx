import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import simbolo from "../assets/simbolo-mono.svg";
import { LinkPagina } from "../components/LinkPagina";
import { paginas } from "../rotas";
import { instalarAtalhoEsc, sairRapido } from "../saidaRapida";

const numero = (indice: number) => String(indice + 1).padStart(2, "0");

export function Cabecalho() {
  const cabecalho = useRef<HTMLElement>(null);
  const [rolou, setRolou] = useState(false);
  const [compacto, setCompacto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => instalarAtalhoEsc(), []);

  useEffect(() => {
    const el = cabecalho.current;
    if (!el) return;
    let percurso = 0;

    const medir = () => {
      const estilo = getComputedStyle(el);
      percurso =
        parseFloat(estilo.getPropertyValue("--cabecalho-alto")) - parseFloat(estilo.getPropertyValue("--cabecalho"));
    };
    const aoRolar = () => {
      const rolado = Math.max(window.scrollY, 0);
      const encolhido = percurso > 0 ? Math.min(rolado / percurso, 1) : 1;
      el.style.setProperty("--encolhido", encolhido.toFixed(4));
      setRolou(rolado > 8);
      setCompacto(encolhido >= 1);
    };
    const aoRedimensionar = () => {
      medir();
      aoRolar();
    };

    aoRedimensionar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setMenuAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  return (
    <header
      ref={cabecalho}
      className={[
        "cabecalho",
        (rolou || menuAberto) && "cabecalho--solido",
        compacto && !menuAberto && "cabecalho--vidro",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container cabecalho__linha">
        <LinkPagina para="inicio" className="marca" aria-label="Sussurro, página inicial">
          <img src={simbolo} alt="" width={38} height={38} className="marca__simbolo" />
          <span className="marca__nome">Sussurro</span>
        </LinkPagina>

        <nav className="menu" aria-label="Páginas">
          {paginas.slice(1).map((p) => (
            <LinkPagina key={p.id} para={p.id} className="menu__link">
              {p.rotulo}
            </LinkPagina>
          ))}
        </nav>

        <button
          type="button"
          className="sair"
          onClick={sairRapido}
          title="Sai desta página na hora. Atalho: Esc três vezes."
        >
          <LogOut size={16} aria-hidden="true" className="sair__icone" />
          Sair rápido
          <kbd className="sair__atalho" aria-hidden="true">
            Esc ×3
          </kbd>
        </button>

        <button
          type="button"
          className="menu__alternar"
          aria-expanded={menuAberto}
          aria-controls="menu-movel"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span className="menu__icone" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="menu-movel"
        className={`menu-movel${menuAberto ? " menu-movel--aberto" : ""}`}
        aria-label="Páginas"
        inert={!menuAberto}
      >
        <div className="menu-movel__dobra">
          <ol className="container menu-movel__lista">
            {paginas.map((p, i) => (
              <li key={p.id}>
                <LinkPagina para={p.id} className="menu-movel__link">
                  <span className="menu-movel__numero">{numero(i)}</span>
                  {p.rotulo}
                </LinkPagina>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </header>
  );
}
