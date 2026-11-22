import icone from "../assets/icone-192.webp";
import calculadora from "../assets/icone-calculadora-192.webp";
import anotacoes from "../assets/icone-discreto-192.webp";
import treinos from "../assets/icone-treinos-192.webp";
import receitas from "../assets/icone-receitas-192.webp";

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
          <h2 className="titulo-l">Na tela do celular, pode parecer outra coisa</h2>
          <p className="secao__lead">
            Escolha um disfarce e a tela inicial do celular passa a mostrar outro ícone e outro nome, como uma
            calculadora. Por dentro, o app continua igual.
          </p>
          <p className="nota-lateral">
            O disfarce protege de uma olhada rápida na tela, não de quem abre o app. Se alguém se aproximar, o botão
            “Sair” no topo fecha tudo na hora.
          </p>
        </div>
        <div className="discreto__tela" data-revelar>
          <div className="discreto__original">
            <img src={icone} alt="" width={64} height={64} loading="lazy" />
            <p>
              <strong>Sussurro</strong>
              <span>Ícone original</span>
            </p>
          </div>
          <p className="discreto__ou">Ou um destes disfarces</p>
          <ul className="disfarces">
            {disfarces.map(({ nome, imagem }) => (
              <li key={nome}>
                <img src={imagem} alt="" width={64} height={64} loading="lazy" />
                {nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
