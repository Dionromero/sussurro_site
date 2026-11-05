import { Brilho } from "../components/Brilho";

export function Manifesto() {
  return (
    <section className="manifesto">
      <div className="container manifesto__corpo" data-revelar>
        <Brilho tamanho={28} className="manifesto__brilho" />
        <blockquote className="manifesto__citacao">
          <p>
            Você não está sozinha. Aqui estão caminhos de apoio perto de você, e cada passo é <em>decisão sua</em>.
          </p>
        </blockquote>
        <p className="manifesto__fonte">Na tela inicial do app</p>
      </div>
    </section>
  );
}
