import apk from "virtual:apk";

const megabytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;

export const download = apk && {
  url: `/downloads/${encodeURIComponent(apk.arquivo)}`,
  arquivo: apk.arquivo,
  versao: apk.versao,
  tamanho: megabytes(apk.bytes),
  sha256: apk.sha256,
};

export const descreverDownload = (...extras: string[]) =>
  download
    ? [download.versao && `Versão ${download.versao}`, download.tamanho, ...extras].filter(Boolean).join(" · ")
    : null;
