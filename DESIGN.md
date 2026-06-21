# DESIGN.md

Sistema de design da landing DothNews. Objetivo: facilitar novos recursos mantendo consistência visual. Para arquitetura geral e regras de colaboração, ver `CLAUDE.md` e `AGENTS.md`.

## Princípios

A página deve transmitir maturidade técnica, confiança operacional e clareza comercial. Visual sóbrio, tipografia técnica (IBM Plex), azul/índigo da marca como acento, muito espaço em branco e detalhes de vidro (liquid glass) pontuais.

## Tokens de cor

Os tokens existem em **dois lugares espelhados** e precisam ser mantidos em sincronia:
- `tailwind.config.js` → classes utilitárias do Tailwind (`bg-primary`, `text-ink`, etc.).
- `src/index.css` (`:root` + utilitários `.bg-*`) → variáveis CSS (`--dn-*`), permitem que ajustes de cor funcionem via HMR de CSS.

Ao mudar uma cor, **altere nos dois arquivos**.

### Primary (azul/índigo da marca)

| Token | Hex | Uso típico |
|-------|-----|-----------|
| `primary` / `500` | `#2B00C9` | Cor principal, botões, links |
| `primary-dark` / `600` | `#0A1E98` | Hover/active de botões |
| `primary-400` | `#394AF7` | Cards em destaque (`Card highlight`) |
| `primary-100` | `#D7DFFB` | Realces claros |
| `primary-soft` / `50` | `#F4F6FD` | Fundos suaves, hover de secundário |
| `700`–`950` | `#092166`→`#030B1A` | Fundos escuros / seções "night" |

Escala completa (`200,300,800,900`) disponível em ambos os arquivos.

### Neutral (cinza azulado) e aliases semânticos

| Alias | Hex | Uso |
|-------|-----|-----|
| `ink` | `#040407` | Texto principal |
| `subink` | `#292D3D` | Texto secundário / `nightcard` |
| `mute` | `#626983` | Texto terciário |
| `faint` | `#949EB7` | Texto auxiliar, legendas |
| `line` | `#DFE7F1` | Bordas e divisores |
| `tint` | `#F0F4FA` | Fundos claros |
| `surface` | `#F4F6FD` | Cards, elevação |
| `canvas` | `#FFFFFF` | Fundo principal |
| `night` | `#0F1219` | Fundo escuro |
| `nightcard` | `#292D3D` | Cards no modo escuro |

Prefira os **aliases semânticos** (`text-ink`, `border-line`, `bg-surface`) a tons crus da escala neutral — eles comunicam intenção e centralizam ajustes.

## Tipografia

- **Família:** IBM Plex Sans (texto) e IBM Plex Mono (eyebrows/labels técnicos). Auto-hospedadas em `public/assets/fonts/` com `@font-face` em `src/index.css` (`font-display: swap`).
- **Pesos carregados:** Sans 400/500/600/700, Mono 400. As variantes críticas (400/700) têm `<link rel="preload">` em `index.html`.
- **Utilitários** (`src/index.css`):
  - `.tracking-eyebrow` — `letter-spacing: 0.18em`, para eyebrows/badges em maiúsculas.
  - `.headline` — kerning apertado (`-0.022em`) para títulos.
  - `.balance` — `text-wrap: balance` (títulos).
  - `.pretty` — `text-wrap: pretty` (parágrafos).

## Ícones (Material Symbols Outlined)

Os ícones são **ligaduras**: renderiza-se o nome (`arrow_outward`) e a fonte transforma em glifo.

- Fonte **auto-hospedada e subsetada**: `public/assets/fonts/material-symbols-outlined.woff2` (~230 KB), `@font-face` com **`font-display: swap`** em `src/index.css` (era `block`; `swap` evita o bloqueio de ~220ms no FCP que o PageSpeed apontava).
- **Por que self-host + guard:** servir a fonte completa do Google com `display=optional` causava FOIT — no primeiro acesso (cache frio) aparecia o texto cru (ex.: `arrow_outward`) até a fonte chegar. O que elimina o flash é o **guard de visibilidade**: `.js .material-symbols-outlined { visibility: hidden }` revelado em `document.fonts.ready` (classe `fonts-ready` em `index.html`). Com o guard, `font-display` pode ser `swap` sem mostrar a ligadura crua.
- **Componentes:** use `<Icon name="..." />` ou a prop `icon` de `<Button />` (ambos em `src/components/ui.jsx`). Ícones são `aria-hidden`.
- **Adicionar um ícone novo:**
  1. Use o ícone no JSX (`<Icon name="novo_icone" />`).
  2. Adicione o nome à lista `ICONS` em `scripts/build-icon-font.sh`.
  3. Rode `bash scripts/build-icon-font.sh` para regenerar o subset.
  4. `npm run build` e confira visualmente em cache frio.
- **Não** reintroduzir Google Fonts com `display=optional`.

## Imagens e prints (carousel / WhatSection / clientes)

Os prints **não são editados à mão em webp**. O fluxo é: **trocar o PNG fonte → rodar o comando → commitar os webp gerados**.

### Como os prints são capturados
- Capturados a partir da **área administrativa real**, em **laptop 1440×900** (via ferramenta de captura do navegador / webmaster tools). Em telas de DPR 2× isso gera PNGs de ~**2880×1800**.
- Mantenha o enquadramento consistente entre prints do mesmo carousel.
- O carousel do hero exibe num box de proporção `1846/928` (~2:1) com `object-cover`; prints 16:10 (1440×900) sofrem leve corte topo/base. Centralize o conteúdo importante.

### Onde ficam os arquivos
Convenção: **PNG fonte numa pasta; webp gerados sempre numa subpasta `webp/` separada.**
- **Carousel (área administrativa):** PNG em `public/assets/area-administrativa/‹nome›.png` (ex.: `dashboard`, `posts`, `criar-post`, `app-token`, `dispositivos-conectados`); webp em `public/assets/area-administrativa/webp/‹nome›-‹largura›.webp`.
- **Monitoramento (Grafana):** PNG em `public/assets/monitoramento/‹nome›.png` (`overview`, `mysql`, `nginx`); webp em `public/assets/monitoramento/webp/`.
- **Prints de clientes:** PNG em `public/assets/clients/prints/‹nome›.png`; webp em `public/assets/clients/prints/webp/‹nome›-‹largura›.webp`.

### Gerar/otimizar as thumbs WebP
```bash
npm run images                 # gera tudo
npm run images -- dashboard    # gera só o que casar com "dashboard" (substring)
npm run images -- correio      # gera só os prints do "correio..."
```
Definido em `scripts/optimize-images.mjs`. Larguras: carousel `[480, 768, 1142, 1846]`, prints `[480, 768, 1200]` (`CAROUSEL_WIDTHS`/`PRINT_WIDTHS`).

### Regra de performance (PageSpeed) — não regredir
- Ao adicionar/trocar imagem, **mantenha o `srcSet` (larguras) e o `sizes` coerentes com a largura real renderizada**. `sizes` inflado faz o browser baixar a variante grande no mobile (foi a causa dos alertas "image larger than needed" do PageSpeed).
- Hero (`src/components/hero.jsx`) e WhatSection/clientes (`src/components/solution.jsx`) constroem o `srcSet` a partir das larguras geradas; o preload LCP em `index.html` deve casar com o `sizes` do hero.

## Liquid glass

Efeito de vidro usado em chips, header ao scroll, botões e alguns cards.

- **Dependência crítica:** os pseudo-elementos `.liquid-glass::before/::after` em `src/styles/components.scss` dependem do filtro SVG `#container-glass` definido em `src/App.jsx` (`feTurbulence` + `feGaussianBlur` + `feDisplacementMap`). **Mudar um lado pode quebrar o outro** — edite e teste juntos.
- O `Chip` (`src/components/ui.jsx`) já encapsula o uso comum do liquid glass.

## Componentes compartilhados (`src/components/ui.jsx`)

| Componente | Para quê |
|-----------|----------|
| `Shell` | Container padrão: `max-w-shell` (1200px) + padding responsivo `px-6 → sm:px-8 → lg:px-12`. Envolva o conteúdo de cada seção. |
| `Reveal` | Wrapper de scroll-reveal (fade + translateY). Aceita `delay`, `as`. Registra listeners globais com self-heal anti-travamento. |
| `Chip` | Badge/eyebrow em liquid glass. `variant: 'default' | 'dark'`. |
| `Button` | `size: sm|md|lg`, `variant: primary|secondary|ghost|white`, `icon` + `iconPosition`, `href` (vira `<a>`), `description` (a11y). |
| `Card` | Cartão padrão (`border-line`) ou `highlight` (fundo `primary-400`, texto branco). |
| `BrowserFrame` / `ScreenFrame` | Mockups de painel (com/sem chrome de navegador). `loading="lazy"`. |
| `Icon` | Span Material Symbols, `aria-hidden`. |
| `CLIENT_LOGOS` | Array dos logos de clientes (marquee da seção de prova social). |

Reutilize esses componentes antes de criar novos. Seções: `header`, `hero`, `problem`, `solution`, `evolution`, `closing`.

## Animações

- **Reveal de scroll:** transição ~0.9s `cubic-bezier`, `translateY(22px)→none`. Lógica em `src/components/ui.jsx` (batch de reads/writes para evitar reflow; snap de segurança).
- **Carousels:** hero (transições push/slide ~700ms) e screen carousel de monitoramento (~380ms + fade de texto) — classes em `src/styles/components.scss`.
- **FAQ accordion:** `grid-template-rows: 0fr → 1fr`.
- **Decorativas:** `spin-badge`, `cue-bob`, `draw-line` (`src/index.css`).
- **Acessibilidade:** tudo respeita `prefers-reduced-motion: reduce`. Mantenha esse respeito ao adicionar animações.

## Layout e responsividade

- Largura máxima de conteúdo: `max-w-shell` = **1200px** (via `Shell`).
- Padding lateral: `px-6` (mobile) → `sm:px-8` → `lg:px-12`.
- Breakpoints: padrões do Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- `scroll-margin-top: 96px` nos âncoras por causa do header fixo.

## Acessibilidade — checklist rápido

- Ícones decorativos: `aria-hidden="true"` (o `Icon`/`Button` já fazem).
- Imagens: `alt` descritivo; mockups podem ter `alt` curto.
- Hierarquia de títulos coerente (um `h1`, depois `h2`/`h3`).
- Respeitar `prefers-reduced-motion`.
- Mensagens de erro do formulário com `role="alert"`.
