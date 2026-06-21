# CLAUDE.md

Orientacoes para Claude Code ou outros assistentes locais neste projeto.

## Projeto

Landing page da DothNews para posicionar a solucao como infraestrutura editorial para portais de noticias em crescimento. A pagina deve transmitir maturidade tecnica, confianca operacional e clareza comercial, evitando tom generico de site institucional.

## Arquitetura

- Entrada: `src/main.jsx`.
- Composicao da pagina: `src/App.jsx`.
- Componentes de secao: `src/components/`.
- Componentes compartilhados: `src/components/ui.jsx`.
- Estilos globais: `src/index.css`.
- Estilos especificos: `src/styles/components.scss`.
- Assets publicos: `public/assets/`.
- Backend do formulario: `api/contact.js` (Vercel serverless) e `api/healthz.js`.
- Sistema de design (tokens, tipografia, componentes, animacoes, acessibilidade): `DESIGN.md`.

## Cuidados importantes

- O formulario em `DiagnosisSection` (`src/components/closing.jsx`) envia POST para `/api/contact` (Vercel serverless em `api/contact.js`: Resend com fallback Nodemailer/SMTP). Destinatarios vem da env var `CONTACT_RECIPIENTS` — nunca hardcodar e-mails. O endpoint tem honeypot (`empresa_site`), rate-limit por IP e headers de seguranca; nao remova essas protecoes.
- Os icones sao a fonte Material Symbols auto-hospedada e subsetada em `public/assets/fonts/material-symbols-outlined.woff2` (`@font-face` com `font-display: swap` em `src/index.css`; o texto cru da ligadura nao aparece porque `.material-symbols-outlined` fica `visibility:hidden` ate `document.fonts.ready`). Ao adicionar/remover um icone, atualize a lista e rode `scripts/build-icon-font.sh` para regenerar o subset. Nao reintroduzir Google Fonts com `display=optional` (causava o texto cru tipo `arrow_outward` no primeiro acesso). Ver `DESIGN.md`.
- O build de producao exige `manualChunks` como funcao em `vite.config.js` (Vite 8 / rolldown).
- Tailwind 4: usa o plugin `@tailwindcss/postcss` (`postcss.config.js`) e `@import "tailwindcss"` em `src/index.css`; os tokens continuam no `tailwind.config.js`, carregado via `@config` (nao remover essa diretiva). Sem autoprefixer (o plugin do TW4 ja faz prefix). React 19: usar `fetchPriority` (camelCase) no JSX, nao `fetchpriority`.
- Imagens (carousel, monitoramento, prints): PNG fonte numa pasta, webp SEMPRE numa subpasta `webp/` separada. Fontes em `public/assets/area-administrativa/`, `public/assets/monitoramento/` e `public/assets/clients/prints/`; webp gerados por `npm run images` (`scripts/optimize-images.mjs`) em `‹pasta›/webp/`. Nao editar webp a mao: trocar o PNG e rodar `npm run images -- ‹nome›`. Ao mudar imagem, manter `srcSet`/`sizes` coerentes com a largura real (sizes inflado regride o PageSpeed). Ver `DESIGN.md`.
- O header usa estado de scroll e menu mobile. Teste visualmente alteracoes nessa area.
- O reveal de scroll fica em `src/components/ui.jsx` e registra listeners globais no modulo.
- O liquid glass usa pseudo-elementos SCSS e filtro SVG em `src/App.jsx`; mudar um lado pode quebrar o outro.
- O build faz pre-render usando `src/entry-server.jsx` e `scripts/prerender.mjs`; preserve o marcador `<div id="root"><!--app-html--></div>` em `index.html`.
- NAO usar `React.lazy`/`Suspense` nas secoes da pagina (`App.jsx`): o `renderToString` suspende (erro React #419) e a secao some do HTML pre-renderizado (ruim p/ SEO). Use imports estaticos para tudo que deve aparecer no SSR.
- O `prerender.mjs` tambem INLINA o CSS no `dist/index.html` (remove o `<link rel="stylesheet">` e o arquivo `.css`): elimina o request render-blocking e encurta a cadeia critica de fontes. Por isso o `dist` final nao tem `.css` externo — e esperado. As fontes sao descobertas do `@font-face` inlinado (nao usamos preload de fonte; com o CSS inline elas ja carregam cedo e `font-display: swap`/`block` cuidam do resto). Preload so para imagem LCP (blob-blue, primeiro slide do carousel).
- SEO tecnico fica principalmente em `index.html`, `public/robots.txt`, `public/sitemap.xml` e `public/assets/og-image.png`.
- Se mudar copy publica, secoes, FAQ, ancoras, oferta, URL canonica, imagem social ou dados institucionais, revise title, description, canonical, hreflang, Open Graph, Twitter Card, JSON-LD e sitemap.
- Se alterar perguntas/respostas do FAQ visual, sincronize o schema `FAQPage` em `index.html`.
- Atualize `dateModified` no JSON-LD e `lastmod` no sitemap quando publicar mudancas relevantes de conteudo.
- Os arquivos `._*` sao artefatos do macOS/volume externo e devem continuar ignorados.

## Testes (obrigatorio)

**Sempre escreva testes.** Esta regra vale para todos os colaboradores — humanos e IAs.

- O projeto usa **Vitest**. Rode com `npm test` (uma vez) ou `npm run test:watch` (desenvolvimento).
- Toda nova funcao de logica (validacao, parsing, formatacao, sanitizacao, regra de negocio) deve vir **acompanhada de testes**. Correcao de bug deve incluir um teste que reproduz o bug.
- Prefira extrair logica pura para modulos testaveis (ex.: `api/_utils.js`; arquivos `_*` em `api/` nao viram rota na Vercel) e testar isoladamente, evitando efeitos colaterais (rede, env, nodemailer, botid).
- Testes ficam ao lado do codigo com sufixo `.test.js`. Nao remova testes para "fazer passar"; conserte o codigo ou ajuste o teste com justificativa.
- O CI roda `npm test` em todo push/PR; nao mergeie com testes quebrados.

## Seguranca (obrigatorio)

**Nunca gere vazamento de tokens/segredos nem introduza falhas de seguranca.** Vale para humanos e IAs.

Segredos e dados sensiveis:
- **Nunca** hardcode segredos, chaves de API, tokens, senhas ou e-mails reais no codigo, testes, docs ou mensagens de commit. Use variaveis de ambiente (`CONTACT_RECIPIENTS`, `ALLOWED_ORIGIN`, `RESEND_API_KEY`, `MAIL_*`, etc.).
- **Nunca** commite `.env`/`.env.*` (ja estao no `.gitignore`); confira o diff antes de commitar.
- Nao logue segredos, corpo de requisicao com dados pessoais, nem `process.env` em `console.log`. Em erros, logue mensagem generica (ja feito em `api/contact.js`).
- Nao exponha detalhes de ambiente em respostas (ex.: `NODE_ENV`) nem mensagens de erro com stack/infra.
- Use dados ficticios em exemplos/amostras/testes (ex.: `contato@example.com`) — nunca PII real.

Entrada do usuario e endpoints:
- Sempre valide no servidor (nao confie no front). Escape/sanitize toda entrada que entra em HTML (`escapeHtml`/`nl2br` em `api/_utils.js`).
- Nao remova as protecoes existentes do `/api/contact`: honeypot (`empresa_site`), rate-limit por IP, headers de seguranca, CORS restrito por `ALLOWED_ORIGIN` e o BotID (`checkBotId`).
- Evite `dangerouslySetInnerHTML`/`innerHTML` com conteudo dinamico nao sanitizado.
- Ao adicionar dependencias, prefira fontes confiaveis; o Dependabot acompanha atualizacoes de seguranca.

Se uma mudanca exigir um novo segredo, adicione apenas o **nome** da variavel na doc/README e configure o valor nas envs da Vercel — nunca o valor real no repo.

## Antes de commitar

Quando o usuario pedir commit, faca uma varredura objetiva:

- Leia o diff.
- Rode `npm test` e garanta que os testes passam; escreva/atualize testes para o que mudou.
- Rode `npm run build` se houve mudanca em codigo, estilos ou assets usados pela pagina.
- Atualize `README.md` se as mudancas alterarem o que a landing e, como ela funciona, quais tecnologias usa, comandos, estrutura, assets ou observacoes de manutencao.
- Confira se mudancas de SEO, copy publica, FAQ, assets sociais ou URLs exigem ajuste em `index.html`, `public/robots.txt`, `public/sitemap.xml`, `README.md` ou `AGENTS.md`.
- Crie commit somente com autorizacao explicita do usuario.
- Faca push somente com autorizacao explicita do usuario.

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

## Estilo de documentacao

- Escrever em portugues claro.
- Ser especifico sobre o estado atual do projeto.
- Nao prometer integracoes ou funcionalidades que ainda nao existem.
- Manter instrucoes curtas e acionaveis.
