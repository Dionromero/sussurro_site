# Sussurro · site

Site do Sussurro, com o download do app para Android. Feito em **React + TypeScript (Vite)** e CSS puro, pré-renderizado em HTML, com a identidade visual do app. Endereço: **https://app-sussurro.com.br**.

## Rodar e gerar

```bash
npm install
npm run dev               # http://localhost:3000
npm run dev -- --host     # abre também para a rede local (testar no celular)
npm run build             # gera dist/
npm run preview           # abre o dist/ com os cabeçalhos de produção
```

O `npm run build` roda o TypeScript, compila o site, compila a versão de servidor (`src/servidor.tsx`) e grava o HTML pronto em cada página (`scripts/prerenderizar.mjs`). O conteúdo aparece sem JavaScript; o React só assume o menu, o QR code e a cópia do SHA-256.

## Antes de publicar

- [x] `CONTATO_EMAIL` em `src/config.ts`. Se ficar vazio, o build avisa e a política mostra que o contato ainda será publicado.
- [ ] Conferir se `POLITICA_DATA`, no mesmo arquivo, é o dia da publicação.
- [ ] Testar o APK em um celular de verdade.
- [ ] Pedir uma revisão jurídica da política de privacidade.

## Publicar na Vercel

1. Importe o repositório. A Vercel detecta Vite: build `npm run build`, saída `dist`.
2. Em **Settings → Domains**, adicione `app-sussurro.com.br` e `www.app-sussurro.com.br`, com o `www` redirecionando para o endereço sem `www`.
3. No painel onde o domínio foi registrado, crie os registros DNS que a Vercel mostrar. O certificado SSL sai sozinho e o HTTPS é obrigatório (HSTS no `vercel.json`).
4. Com o site no ar, cadastre `https://app-sussurro.com.br/sitemap.xml` no Google Search Console.

O APK instalado abre `https://app-sussurro.com.br/acompanhar/`. Se o domínio mudar, é preciso gerar outro APK e trocar `SITE_URL` em `src/config.ts`.

## Páginas

| Página      | Endereço        | Conteúdo                                              |
| ----------- | --------------- | ----------------------------------------------------- |
| Início      | `/`             | Apresentação, emergência, telas do app e perguntas    |
| O app       | `/o-app/`       | Recursos e modo discreto                              |
| Privacidade | `/privacidade/` | Política de privacidade                               |
| Instalar    | `/instalar/`    | Download do APK, passo a passo e conferência          |
| Sobre       | `/sobre/`       | O projeto e as fontes dos dados                       |
| Acompanhar  | `/acompanhar/`  | Localização ao vivo, aberta por link do app (noindex) |
| 404         | `404.html`      | Endereço inexistente                                  |

- `src/rotas.ts`: páginas, rótulos, títulos e descrições.
- `src/config.ts`: domínio, contato, data da política e certificado do APK.
- `src/canais.ts`, `src/perguntas.ts`: telefones e perguntas frequentes, usados na tela, nos dados estruturados e no `llms.txt`.
- `seo.ts`: título, descrição, canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml` e `llms.txt`.
- `src/acompanhar/`: página de acompanhamento, independente do resto. `/acompanhar/#demo` mostra um trajeto simulado.

Para criar uma página: acrescente em `src/rotas.ts`, copie `sobre/index.html` para a pasta nova (trocando `data-pagina`), crie o componente em `src/paginas/`, registre em `src/App.tsx` e em `scripts/prerenderizar.mjs`.

## Publicar uma versão do app

Por enquanto o app é distribuído só por este site, sem Play Store.

1. Gere o APK no repositório do app (`flutter build apk --release`), com `versionCode` maior que o anterior.
2. Assine com a chave do projeto. Ela fica **fora do Git**; sem a mesma chave, quem já instalou não consegue atualizar:

   ```bash
   apksigner sign --ks sussurro-release.jks --ks-key-alias sussurro --out sussurro-0.1.1.apk app-release.apk
   apksigner verify --print-certs sussurro-0.1.1.apk
   ```

   O SHA-256 do certificado precisa ser igual a `APK_CERTIFICADO` em `src/config.ts`.
3. Copie para `public/downloads/` com a versão no nome, apague o anterior e rode `npm run build`.

O site lê versão, tamanho e SHA-256 do arquivo. Sem APK na pasta, o botão vira "download em breve".

## Cabeçalhos

Ficam em **`vercel.json`**, a fonte única; `npm run preview` aplica os mesmos. No `dev`, a CSP e o cache ficam de fora.

- O site inteiro só carrega arquivos próprios (`'self'`). Por isso não use `style=""` nem scripts inline: a CSP bloqueia.
- `/acompanhar/` tem uma CSP própria, que libera o mapa do OpenStreetMap e o Supabase, e não vai para cache.
- `assets/` e `fonts/` ficam um ano em cache. Ao trocar uma fonte, mude o número no nome do arquivo.

## Decisões

- **Saída rápida:** `public/saida.js` carrega antes do React e cuida do botão "Sair rápido", do **Esc três vezes** e dos links internos, sempre com `location.replace`, para o site ocupar uma só entrada no "voltar". Sem JavaScript, "Sair rápido" continua sendo um link.
- **Títulos discretos:** o título da aba e a imagem de compartilhamento não citam violência.
- **Privacidade em `/acompanhar/`:** o site não consulta o Nominatim. O mapa envia ao OpenStreetMap só a origem (`referrerPolicy: "origin"`), que ele exige para entregar as imagens.
- **Imagens:** todas em WebP e abaixo de 300 KB. As telas em `src/assets/telas/` são capturas da versão web do app, feitas em novembro de 2026; refaça quando o app mudar. Ilustração e símbolo são SVG; o favicon é PNG por compatibilidade.
- **Fontes:** Fraunces e Atkinson Hyperlegible em WOFF2, reduzidas aos caracteres do português. Licenças OFL em `public/fonts/`.
- **Movimento:** só entrada suave ao rolar. Com "reduzir movimento" ligado, nada anima.

## Limites

Não coletar relatos, documentos ou dados sensíveis neste site. Ele não substitui o 190, o 180 nem o atendimento especializado.
