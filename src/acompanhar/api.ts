import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export type Status = "ativo" | "aguardando" | "encerrado" | "expirado" | "inexistente";

export interface Posicao {
  status: Status;
  label: string | null;
  latitude: number | null;
  longitude: number | null;
  accuracy_m: number | null;
  updated_at: string | null;
  expires_at: string | null;
}

export function modoDemoDoLink(): boolean {
  return /(?:^#|&)demo(?:&|$)/.test(window.location.hash.trim());
}

export function tokenDoLink(): string | null {
  const hash = window.location.hash.trim();
  const m = hash.match(/[#&]t=([A-Za-z0-9_-]{16,})/);
  return m ? m[1] : null;
}

const TRAJETO_DEMO: Array<[number, number]> = [
  [-25.4084, -49.2546],
  [-25.4071, -49.2533],
  [-25.4059, -49.2519],
  [-25.4048, -49.2504],
];

export function posicaoDemo(passo: number): Posicao {
  const [latitude, longitude] = TRAJETO_DEMO[passo % TRAJETO_DEMO.length];
  const agora = Date.now();
  return {
    status: "ativo",
    label: "Ana (demonstração)",
    latitude,
    longitude,
    accuracy_m: 14,
    updated_at: new Date(agora).toISOString(),
    expires_at: new Date(agora + 25 * 60_000).toISOString(),
  };
}

export async function buscarPosicao(token: string, sinal?: AbortSignal): Promise<Posicao> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/location_share_view`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ viewer_token: token }),
    signal: sinal,
    referrerPolicy: "no-referrer",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const linhas = (await r.json()) as Posicao[];
  if (!linhas.length) throw new Error("resposta vazia");
  return linhas[0];
}

