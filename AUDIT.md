# Auditoria de Front-end — ZivvuTasks

> Etapa 1 (auditoria) do trabalho de melhoria de front-end, UX e performance,
> com foco em responsividade mobile. Nenhuma alteração de código foi aplicada
> ainda — este documento lista os problemas encontrados e prioriza as correções.

## Contexto

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4;
  ícones `lucide-react` e `react-icons`; fontes via `next/font`.
- **App:** gerenciador de tarefas Kanban (colunas + cartões + drag-and-drop),
  persistido em `localStorage`. Rotas: `/` (apresentação), `/board` (quadro),
  `/tutorial`.
- **Público:** usuário final geral, sem login — parte relevante via celular.

---

## 🔴 Responsividade e layout mobile

| # | Problema | Local | Prioridade |
|---|----------|-------|------------|
| 1 | `grid grid-cols-2` fixo + cards `w-[25em]` (~400px) e títulos `text-[3em]/[5em]` **sem breakpoints** → quebra e **scroll horizontal** abaixo de ~800px | `app/page.tsx` | **Crítico** |
| 2 | Header em `grid-cols-3` com nav sempre horizontal — **sem menu hambúrguer**; título `text-4xl` ocupa demais no mobile | `app/components/header.tsx` | **Crítico** |
| 3 | Underline da nav depende de `onMouseEnter` — **não funciona em toque** | `header.tsx` | Importante |
| 4 | Modal `w-[30em]` (~480px) fixo, sem `max-width`/`w-full` → **estoura em 320px** | `app/board/page.tsx:232` | **Crítico** |
| 5 | Cabeçalho do board `justify-between` com `text-3xl` + botão aperta em telas pequenas | `board/page.tsx:111` | Importante |
| 6 | `<img>` com `w-[80%] h-[80%]` e sem `loading`/dimensões | `page.tsx:37` | Importante |
| 7 | Viewport: não há `export const viewport` no layout (depende só do default do Next) | `app/layout.tsx` | Desejável |

> O scroll horizontal das colunas do board é intencional (Kanban) e está ok.

## 🟠 Performance

| # | Problema | Prioridade |
|---|----------|------------|
| 8 | `<img>` cru em vez de `next/image` → sem otimização, lazy-load nem `width/height` (gera **CLS**) | Importante |
| 9 | Navegação interna via `window.location.href` (`route.navigate`) → **full reload**, perde o SPA; deveria usar `next/link`/`useRouter` | Importante |
| 10 | Dependência `lucide` (vanilla) instalada e **não usada** — só `lucide-react` é necessária | Importante |
| 11 | Manrope carregada com **7 pesos** (`200`–`800`); dá pra enxugar | Desejável |

## 🟡 Acessibilidade (a11y)

| # | Problema | Prioridade |
|---|----------|------------|
| 12 | **Bug de dark mode:** `@media (prefers-color-scheme: dark)` mantém `--background:#fff` mas muda `--foreground:#ededed` → **texto branco em fundo branco** | `globals.css:17` — **Crítico** |
| 13 | Ícone `Link` do **lucide-react** usado como `<Link href target>` nos links sociais — é um **SVG, não uma âncora**; os links **não funcionam** | `page.tsx:4,47-55` — **Crítico** |
| 14 | Botões só-ícone (lixeira, ✕) sem `aria-label` (só `title`) | Importante |
| 15 | Labels do formulário não associadas aos inputs (`htmlFor`/`id`) | Importante |
| 16 | `alt="TaskFlow"` incorreto (produto é ZivvuTasks) | Importante |
| 17 | Áreas de toque < 44×44px (ícones 16px, selects, sociais) | Importante |
| 18 | Sem estilos de `:focus-visible`; modal não fecha com **Esc** | Desejável |

## 🟢 Qualidade e organização do código

| # | Problema | Prioridade |
|---|----------|------------|
| 19 | Imports não usados (`usePathname`, vários ícones, `pathname` calculado e nunca usado em `page.tsx`) | Importante |
| 20 | Cores hex hard-coded repetidas — deveriam virar **tokens no tema** do Tailwind | Importante |
| 21 | Mistura de libs de ícone sem necessidade clara | Desejável |
| 22 | Ausência de `export const metadata` (título/descrição da aba e SEO) | Desejável |

## 🔵 UX e usabilidade

| # | Problema | Prioridade |
|---|----------|------------|
| 23 | Apagar coluna remove as tarefas **sem confirmação**; apagar tarefa idem | Importante |
| 24 | Input de renomear coluna sempre editável, **sem affordance** de que é clicável | Desejável |
| 25 | Tutorial diz que drag "em breve", mas o board já tem DnD — texto desalinhado | Desejável |

## ⚫ Segurança e boas práticas

| # | Problema | Prioridade |
|---|----------|------------|
| 26 | `target="_blank"` sem `rel="noopener noreferrer"` | Importante |
| 27 | `JSON.parse(localStorage…)` sem `try/catch` → dado corrompido **quebra o app** | Importante |

---

## Priorização resumida

- **Crítico:** #1, #2, #4 (layout mobile quebrado), #12 (dark mode some), #13 (links sociais não funcionam).
- **Importante:** responsividade fina, `next/image`, navegação SPA, a11y de botões/labels, toque 44px, `try/catch` no storage, `rel` de segurança, limpeza de código.
- **Desejável:** tokens de tema, metadata, focus-visible/Esc, ajustes de UX e texto.

---

## Plano de implementação proposto (Etapas 2 e 3)

Aplicar em commits incrementais:

1. **Correções críticas isoladas** (baixo risco): dark mode, links sociais (`next/link`), `rel` de segurança, `try/catch` no localStorage, viewport + metadata.
2. **Header mobile-first**: menu responsivo (hambúrguer) e nav acessível por toque/teclado.
3. **Home (`page.tsx`) mobile-first**: refazer grid/cards com breakpoints, tipografia fluida (`clamp`), `next/image`.
4. **Board + modal mobile-first**: modal responsivo + Esc, áreas de toque ≥44px, confirmação ao apagar.
5. **Limpeza**: imports, dependência `lucide` não usada, tokens de tema.
