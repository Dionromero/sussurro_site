export function Brilho({ tamanho = 16, className }: { tamanho?: number; className?: string }) {
  return (
    <svg className={className} width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C13 7 17 11 24 12C17 13 13 17 12 24C11 17 7 13 0 12C7 11 11 7 12 0Z" fill="currentColor" />
    </svg>
  );
}
