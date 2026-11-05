import qrcode from "qrcode-generator";

const MARGEM = 2;

export function QrCode({ texto, rotulo }: { texto: string; rotulo: string }) {
  const qr = qrcode(0, "M");
  qr.addData(texto);
  qr.make();

  const lado = qr.getModuleCount();
  let quadrados = "";
  for (let linha = 0; linha < lado; linha++) {
    for (let coluna = 0; coluna < lado; coluna++) {
      if (qr.isDark(linha, coluna)) quadrados += `M${coluna} ${linha}h1v1h-1z`;
    }
  }

  const tamanho = lado + MARGEM * 2;
  return (
    <svg
      className="qr"
      viewBox={`${-MARGEM} ${-MARGEM} ${tamanho} ${tamanho}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={rotulo}
    >
      <rect x={-MARGEM} y={-MARGEM} width={tamanho} height={tamanho} fill="#fffcf7" />
      <path d={quadrados} fill="#231c19" />
    </svg>
  );
}
