import { Download } from "lucide-react";
import { download } from "../download";

type Props = { rotulo?: string; variante?: "primario" | "claro" };

export function BotaoDownload({ rotulo = "Baixar para Android", variante = "primario" }: Props) {
  if (!download) {
    return (
      <span className={`botao botao--${variante} botao--desativado`} aria-disabled="true">
        <Download size={18} aria-hidden="true" />
        Android · em breve
      </span>
    );
  }
  return (
    <a className={`botao botao--${variante}`} href={download.url} download={download.arquivo}>
      <Download size={18} aria-hidden="true" />
      {rotulo}
    </a>
  );
}
