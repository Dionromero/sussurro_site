# Sussurro · site

Site vitrine do Sussurro, com o download do app para Android. Feito em **React + TypeScript (Vite)** e CSS puro, com a mesma identidade visual do app: cores, fontes (Fraunces e Atkinson Hyperlegible, servidas pelo próprio site) e ilustração.

## Rodar e gerar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera dist/ (roda o TypeScript antes)
npm run preview  # abre o dist/ gerado
```

## Páginas

| Página      | Endereço        | Conteúdo                                         |
| ----------- | --------------- | ------------------------------------------------ |
| Início      | `/`             | Apresentação, emergência, atalhos e download     |
| O app       | `/o-app/`       | Recursos do app e modo discreto                  |
| Privacidade | `/privacidade/` | O que o app guarda, o que não faz e este site    |
| Instalar    | `/instalar/`    | Download do APK e passo a passo                  |
| Sobre       | `/sobre/`       | O projeto de extensão e a origem dos dados       |
| Acompanhar  | `/acompanhar/`  | Página privada de localização ao vivo (fora do menu) |

### Acompanhamento ao vivo (`/acompanhar/`)

Acessada apenas pelo link enviado pela usuária no app (`/acompanhar/#t=<viewer_token>`). O token fica depois do `#`, fora dos logs do servidor. Para testar a interface localmente sem criar sessão no banco, abra `http://localhost:3000/acompanhar/#demo`.

No `vercel.json`, a rota `/acompanhar(.*)` possui uma regra própria de CSP e COEP (`unsafe-none`) para permitir apenas o carregamento de tiles do OpenStreetMap (`tile.openstreetmap.org`), geocoding reverso (`nominatim.openstreetmap.org`) e a RPC pública `location_share_view` no Supabase — mantendo a política estrita (`'self'`) nas demais páginas do site.

Para ativar o recurso no app Android, gere o build informando o endereço publicado:

```bash
flutter build apk --release --dart-define=TRACKING_PAGE_URL=https://SEU-DOMINIO/acompanhar/
```

Cada página é um HTML de verdade (`index.html` e `<pasta>/index.html`), então recarregar e abrir por link direto funcionam em qualquer hospedagem, sem configurar o servidor.

- `src/rotas.ts`: lista das páginas (ordem do menu, rótulo e resumo).
- `src/main.tsx`: qual componente cada página mostra (`src/paginas/`).
- `src/layout/`: cabeçalho, abertura das páginas internas e rodapé.
- `src/sections/`: blocos de conteúdo usados pelas páginas.

Para criar uma página: acrescente em `src/rotas.ts`, copie `sobre/index.html` para a pasta nova (trocando `data-pagina`, título e descrição), crie o componente em `src/paginas/` e registre em `src/main.tsx`. O build passa a gerar a página sozinho.

## Publicar uma versão do app

1. Gere o APK no repositório do app (`flutter build apk --release`).
2. Copie para `public/downloads/` com a versão no nome, por exemplo `sussurro-0.1.0.apk`.
3. Rode `npm run build` e publique.

O site encontra o arquivo sozinho (plugin em `vite.config.ts`) e mostra versão, tamanho e SHA-256. Sem APK na pasta, o botão fica como "Android · em breve". Se houver mais de um APK, vale o mais recente; apague os antigos para não publicá-los junto.

## Publicar o site

O `dist/` é um site estático: serve em Vercel, Netlify, GitHub Pages ou qualquer hospedagem de arquivos. Os caminhos são relativos (`base: "./"`), então funciona na raiz de um domínio ou em uma subpasta, como `usuario.github.io/sussurro/`.

### Cabeçalhos de segurança

Os cabeçalhos pedidos pelo [securityheaders.com](https://securityheaders.com) ficam em **`vercel.json`**, a fonte única: CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e os `Cross-Origin-*`.

- **Vercel:** lê o `vercel.json` sozinha.
- **Netlify e Cloudflare Pages:** o build gera `dist/_headers` com o mesmo conteúdo.
- **GitHub Pages:** não permite cabeçalhos próprios; ali o site não passa no securityheaders.
- **`npm run preview`:** manda todos, para testar o build com a política de verdade.
- **`npm run dev`:** manda todos menos a CSP (o Vite precisa de script inline e WebSocket para recarregar).

A CSP só aceita arquivos do próprio site (`'self'`) e `data:` em imagens (o grão de papel do CSS). Se um dia entrar algo de fora (fonte, mapa, analytics), o domínio precisa ser acrescentado no `vercel.json`, senão o navegador bloqueia.

## Decisões

- **Saída rápida:** botão "Sair rápido" no topo e atalho **Esc três vezes**. Troca a página por uma pesquisa comum usando `location.replace`, para ela não ficar no botão "voltar".
- **Navegação sem rastro no "voltar":** os links entre páginas também usam `location.replace` (`src/navegacao.ts`). O site inteiro ocupa uma só entrada no histórico de abas, então, depois da saída rápida, o botão "voltar" não traz nenhuma página do Sussurro. O preço é que "voltar" não volta para a página anterior do site; para isso existe o menu. Ctrl/⌘ + clique continua abrindo em outra aba.
- **Sem rastreadores:** nada de analytics, cookies, fontes do Google ou scripts de terceiros. O QR code é gerado no navegador.
- **`<head>` comum:** favicon, `theme-color`, `referrer`, `robots` e o preload da fonte são inseridos em todas as páginas pelo plugin `cabecaComum` em `vite.config.ts`. Cada HTML só tem título e descrição.
- **`noindex`:** o site não aparece no Google enquanto o app estiver em piloto. Quando o app for público, tire a linha `robots` do plugin `cabecaComum` em `vite.config.ts`.
- **Movimento:** as seções surgem ao rolar (`data-revelar`, em `src/revelar.ts`). Com "reduzir movimento" ligado no sistema, nada anima.
- **Tela do celular:** `src/components/Celular.tsx` redesenha a tela inicial do app em HTML/CSS. É uma ilustração; quando houver capturas reais, troque por uma imagem.
- **Textos e marca:** vêm do app e da landing page do repositório `app-rede-apoio` (`app/assets/brand`, `app/assets/fonts`, `app/lib/core/theme/app_colors.dart`). Se o app mudar, atualize aqui também.

## Limites

Não coletar relatos, localização, documentos ou dados sensíveis neste site. Ele não substitui o 190, o 180 nem o atendimento especializado.
