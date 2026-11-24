import { BookOpen, MapPinned, PhoneCall, Users, WifiOff, type LucideIcon } from "lucide-react";
import { Tela } from "../components/Tela";

type Recurso = { icone: LucideIcon; titulo: string; texto: string };

const recursos: Recurso[] = [
  {
    icone: MapPinned,
    titulo: "Mapa da rede de proteção",
    texto:
      "São 90 locais de Curitiba: delegacias, CRAS, CREAS, Defensoria, UPAs e hospitais de referência. Endereços e telefones vêm de fontes oficiais, e o app mostra os mais próximos e a rota a pé ou de carro.",
  },
  {
    icone: Users,
    titulo: "Pessoas de confiança",
    texto:
      "Cadastre até cinco contatos, que ficam só no seu celular. O app abre o WhatsApp ou o SMS com a sua localização pronta, e você confirma o envio. Também dá para compartilhar ao vivo por 15, 30 ou 60 minutos.",
  },
  {
    icone: BookOpen,
    titulo: "Direitos e orientações",
    texto:
      "Sete guias: como pedir uma medida protetiva, registrar um boletim de ocorrência, montar um plano de segurança e outros. Os textos ainda aguardam revisão por profissionais da rede, e o app avisa isso.",
  },
  {
    icone: PhoneCall,
    titulo: "190 e 180 na primeira tela",
    texto: "O app abre a ligação e você confirma antes de discar. Ele nunca liga sozinho.",
  },
  {
    icone: WifiOff,
    titulo: "O que funciona sem internet",
    texto:
      "Os telefones de emergência, os guias e uma lista essencial de locais. O mapa, a lista completa e as rotas precisam de conexão.",
  },
];

export function PorDentro() {
  return (
    <section className="secao secao--colada" aria-labelledby="titulo-recursos">
      <div className="container por-dentro">
        <figure className="por-dentro__celular">
          <Tela tela="inicio" tamanhos="(max-width: 56.25em) 260px, 320px" prioridade />
          <figcaption>Captura da versão de testes. Mapa © colaboradores do OpenStreetMap · OpenFreeMap.</figcaption>
        </figure>
        <div>
          <h2 id="titulo-recursos" className="titulo-m">
            Recursos
          </h2>
          <ul className="recursos">
            {recursos.map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo} className="recurso" data-revelar>
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
