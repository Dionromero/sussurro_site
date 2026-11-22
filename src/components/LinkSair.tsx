import { LogOut } from "lucide-react";
import { URL_SAIDA } from "../config";

export function LinkSair() {
  return (
    <a className="sair" href={URL_SAIDA} data-sair="" rel="noreferrer" title="Sai desta página na hora. Atalho: Esc três vezes.">
      <LogOut size={16} aria-hidden="true" className="sair__icone" />
      Sair rápido
      <kbd className="sair__atalho" aria-hidden="true">
        Esc ×3
      </kbd>
    </a>
  );
}
