import icone from "../assets/icone-192.png";
import calculadora from "../assets/icone-calculadora-192.png";
import anotacoes from "../assets/icone-discreto-192.png";
import treinos from "../assets/icone-treinos-192.png";
import receitas from "../assets/icone-receitas-192.png";
import { atraso } from "../revelar";

const disfarces = [
  { nome: "Calculadora", imagem: calculadora },
  { nome: "Anotações", imagem: anotacoes },
  { nome: "Treinos", imagem: treinos },
  { nome: "Receitas", imagem: receitas },
];

export function ModoDiscreto() {
  return (
    <section className="secao secao--papel">
      <div className="container discreto">
        <div data-revelar>
          <p className="rotulo">Modo discreto</p>
          <h2 className="titulo-l">
            Na tela do celular, pode parecer <em>outra coisa</em>.
          </h2>
          <p className="secao__lead">
            Escolha um disfarce e a tela inicial do celular passa a mostrar outro ícone e outro nome, como uma
            calculadora. Por dentro, o app continua igual.
          </p>
          <p className="nota-lateral">
            O disfarce protege de uma olhada rápida na tela, não de quem abre o app. Se alguém se aproximar, o botão
            “Sair” no topo fecha tudo na hora.
          </p>
        </div>
        <div className="discreto__tela" data-revelar style={atraso(120)}>
          <div className="discreto__original">
            <img src={icone} alt="" width={64} height={64} />
            <p>
              <strong>Sussurro</strong>
              <span>Ícone original</span>
            </p>
          </div>
          <p className="discreto__ou">Ou um destes disfarces</p>
          <ul className="disfarces">
            {disfarces.map(({ nome, imagem }) => (
              <li key={nome}>
                <img src={imagem} alt="" width={64} height={64} />
                {nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
