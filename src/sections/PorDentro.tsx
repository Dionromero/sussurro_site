import { BookOpen, MapPinned, PhoneCall, Users, WifiOff, type LucideIcon } from "lucide-react";
import { Celular } from "../components/Celular";
import { atraso } from "../revelar";

type Recurso = { icone: LucideIcon; titulo: string; texto: string };

const recursos: Recurso[] = [
  {
    icone: MapPinned,
    titulo: "Mapa da rede de proteção",
    texto:
      "Delegacias da mulher, CRAS, CREAS, Defensoria, UPAs e hospitais de Curitiba, com endereço e telefone conferidos em fontes oficiais. Mostra os mais próximos e traça a rota a pé ou de carro.",
  },
  {
    icone: Users,
    titulo: "Pessoas de confiança",
    texto:
      "Cadastre até cinco contatos. Com um toque, o app abre o WhatsApp com a sua localização pronta para enviar. Os contatos ficam só no seu celular.",
  },
  {
    icone: BookOpen,
    titulo: "Direitos e orientações",
    texto:
      "Como pedir uma medida protetiva, registrar um boletim de ocorrência e montar um plano de segurança. Textos curtos, em revisão por profissionais da rede.",
  },
  {
    icone: PhoneCall,
    titulo: "190 e 180 na primeira tela",
    texto: "O app abre a ligação e você confirma antes de discar. Ele nunca liga sozinho.",
  },
  {
    icone: WifiOff,
    titulo: "Funciona sem internet",
    texto: "Os canais de emergência, as orientações e a lista de locais ficam salvos no aparelho.",
  },
];

export function PorDentro() {
  return (
    <section className="secao secao--colada" aria-labelledby="titulo-recursos">
      <div className="container por-dentro">
        <div className="por-dentro__celular" data-revelar>
          <Celular />
        </div>
        <div>
          <h2 id="titulo-recursos" className="rotulo">
            O que tem dentro
          </h2>
          <ul className="recursos">
            {recursos.map(({ icone: Icone, titulo, texto }, i) => (
              <li key={titulo} className="recurso" data-revelar style={atraso(i * 70)}>
                <span className="recurso__icone">
                  <Icone size={22} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
