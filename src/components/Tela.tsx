import { telas } from "../telas";

type Props = { tela: keyof typeof telas; tamanhos: string; prioridade?: boolean };

export function Tela({ tela, tamanhos, prioridade = false }: Props) {
  const { grande, pequena, descricao } = telas[tela];
  return (
    <div className="tela">
      <img
        srcSet={`${pequena} 320w, ${grande} 600w`}
        sizes={tamanhos}
        src={grande}
        alt={descricao}
        width={600}
        height={1298}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding="async"
      />
    </div>
  );
}
