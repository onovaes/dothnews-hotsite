# AGENTS.md

Instrucoes para agentes e assistentes que trabalharem neste repositorio.

## Contexto do projeto

Este repositorio contem a landing page da DothNews, criada para apresentar a plataforma como infraestrutura editorial especializada para portais de noticias. O foco da pagina e conversao para diagnostico consultivo, com discurso institucional, provas de mercado e evidencias visuais do produto.

## Stack

- React 18 com Vite.
- Tailwind CSS para layout e tokens.
- SCSS em `src/styles/components.scss` para efeitos e ajustes especificos.
- Assets estaticos em `public/assets/`.

## Comandos uteis

```bash
npm run dev
npm run build
npm run preview
```

Use `npm run build` como validacao principal antes de finalizar alteracoes de codigo.

## Padroes de implementacao

- Preserve a estrutura modular em `src/components/`.
- Reutilize `Shell`, `Reveal`, `Eyebrow`, `Card` e `Icon` de `src/components/ui.jsx` quando fizer sentido.
- Mantenha os tokens de cor e fonte em `tailwind.config.js`.
- Evite duplicar estilos globais se a solucao couber em Tailwind ou nos utilitarios existentes.
- O efeito `.liquid-glass` depende do filtro SVG `#container-glass` definido em `src/App.jsx`.
- Cuidado ao alterar o hero: ele combina layout, blobs SVG e blur para reproduzir a direcao visual atual.
- Preserve acessibilidade basica: `alt` em imagens relevantes, labels em formulario e estados claros em botoes.

## SEO e boas praticas

- Preserve o pre-render do build: `npm run build` roda Vite client, Vite SSR com `src/entry-server.jsx` e `scripts/prerender.mjs`.
- Nao remova o marcador `<div id="root"><!--app-html--></div>` de `index.html`; ele e usado pelo pre-render.
- Mantenha consistentes title, meta description, canonical, hreflang, Open Graph, Twitter Card, JSON-LD, `public/robots.txt` e `public/sitemap.xml`.
- A URL canonica atual e `https://dothnews.com.br/`; se ela mudar, atualize todas as referencias absolutas.
- Quando alterar headline, proposta, secoes, FAQ, ancoras, oferta, dados institucionais ou assets sociais, revise os metadados e schemas em `index.html`.
- Se alterar perguntas/respostas visiveis do FAQ, atualize tambem o schema `FAQPage`.
- Atualize `dateModified` no JSON-LD e `lastmod` no sitemap em publicacoes relevantes de conteudo.
- Preserve `public/assets/og-image.png` como imagem social 1200x630 ou ajuste os metadados correspondentes.

## Documentacao e commits

Sempre que o usuario pedir para commitar:

1. Revise o diff antes do commit.
2. Verifique se houve mudanca em proposta da landing, secoes, copy, tecnologias, scripts, assets, fluxo de formulario, estrutura de componentes ou instrucoes de manutencao.
3. Se houver impacto relevante, atualize `README.md` antes de commitar.
4. Confirme que arquivos gerados, dependencias, `.env*`, `.claude/`, `dist/`, `node_modules/` e `._*` nao entraram no commit.
5. Rode `npm run build` quando houver alteracao de codigo, estilos ou assets usados pela aplicacao.
6. Quando houver alteracao de SEO, copy publica, FAQ, assets sociais ou URLs, confira `index.html`, `public/robots.txt`, `public/sitemap.xml`, `README.md` e este arquivo.

## Regras de colaboracao

- Nunca crie um commit sem autorizacao explicita do usuario.
- Nunca envie branches ou commits para o GitHub sem autorizacao explicita do usuario.
- Nunca abra, atualize ou faca merge de pull request sem autorizacao explicita do usuario.
- So crie commit, faca push ou aja em pull request quando a solicitacao partir explicitamente do usuario. Nao inicie essas acoes de forma proativa.
- Pode sugerir mensagem de commit ao usuario usando Conventional Commits, com prefixos como `feat`, `fix`, `docs`, `refactor`, `test` ou `chore`.
- Quando o usuario pedir commit, comece revisando o diff atual e rodando ou reportando as validacoes mais relevantes antes de propor ou criar o commit.
- Se a working tree tiver mudancas nao relacionadas, liste exatamente quais arquivos pertencem ao escopo solicitado antes de stage ou commit.
- Use validacao minima conforme o tipo de mudanca: documentacao ou workflow exigem revisao de diff; Blade, CSS ou JS exigem a validacao frontend mais relevante disponivel; PHP ou Livewire exigem o teste ou comando de validacao mais relevante disponivel.
- Nunca faca stage ou commit de arquivos acidentais como `.DS_Store`, logs, dumps, screenshots ou artefatos temporarios, salvo pedido explicito do usuario.
- Se o diff tiver multiplos escopos nao relacionados, sugira separar em commits distintos, mas nunca crie multiplos commits sem aprovacao explicita do usuario.
- Ao criar ou atualizar pull request, consulte e siga `.github/PULL_REQUEST_TEMPLATE.md`.
- Titulos de pull request tambem devem seguir Conventional Commits, com prefixos como `feat`, `fix`, `docs`, `refactor`, `test` ou `chore`.
- Antes de criar pull request, mostre titulo proposto, branch base, branch head e corpo do PR para revisao do usuario. Crie o PR somente apos aprovacao explicita.
- Quando uma nova instrucao recorrente ou regra de workflow se tornar importante para trabalhos futuros, sugira explicitamente adiciona-la ao `AGENTS.md`.
- Antes de editar arquivos, inspecione o contexto relevante e explique brevemente a mudanca pretendida.
- Depois de fazer alteracoes, apresente o diff relevante e os resultados de validacao antes de propor passos de commit ou PR.

## GitHub

O remoto esperado e:

```text
git@github.com:tulioavalos-ux/dothnews-landingpage.git
```

Commits devem usar o email `tulioavalos@gmail.com`.
