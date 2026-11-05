declare module "virtual:apk" {
  const apk: { arquivo: string; versao: string | null; bytes: number; sha256: string } | null;
  export default apk;
}
