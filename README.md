# ZivvuTasks

> Organize sua rotina com simplicidade.

**ZivvuTasks** é um gerenciador de tarefas no estilo **Kanban**: você organiza suas tarefas em colunas por status, arrasta os cartões entre as colunas e tem tudo salvo automaticamente no próprio navegador — sem login, sem servidor, sem banco de dados.

---

## ✨ Funcionalidades

- 📋 **Quadro com colunas por status** — começa com 5 colunas (A Fazer, Em Progresso, Em Revisão, Concluído, Cancelado).
- ➕ **Criação de colunas** — adicione novas etapas no seu fluxo, com limite de **8 colunas**.
- ✏️ **Colunas renomeáveis** — clique no nome de qualquer coluna para editar.
- 📝 **Criação de tarefas** — via modal com título, descrição e coluna de destino.
- 🖱️ **Arrastar e soltar (drag and drop)** — mova cartões entre colunas (com um seletor de atalho como alternativa no toque).
- 💾 **Persistência automática** — colunas e tarefas ficam salvas no `localStorage` do navegador.
- 📖 **Página de tutorial** — explica o passo a passo de uso da plataforma.

---

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) e [react-icons](https://react-icons.github.io/react-icons) (ícones)
- Fontes [Manrope](https://fonts.google.com/specimen/Manrope) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via `next/font`

---

## 🚀 Como rodar

```bash
# instalar as dependências
npm install

# rodar em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Outros comandos:

```bash
npm run build   # gera a build de produção
npm run start   # roda a build de produção
npm run lint    # verifica o código com ESLint
```

---

## 📁 Estrutura

```
app/
├── components/
│   ├── header.tsx     # cabeçalho com navegação e underline deslizante
│   └── footer.tsx     # rodapé
├── board/
│   └── page.tsx       # o quadro Kanban (colunas, tarefas, drag and drop, localStorage)
├── tutorial/
│   └── page.tsx       # página de tutorial de uso
├── layout.tsx         # layout raiz (fontes, header e footer globais)
├── page.tsx           # página inicial (apresentação da plataforma)
└── globals.css        # estilos globais, tema e animações do modal
```

---

## 💾 Como os dados são salvos

A ZivvuTasks **não usa banco de dados**. Tudo é guardado no `localStorage` do navegador, sob as chaves:

- `zivvu_colunas` — a lista de colunas
- `zivvu_tasks` — a lista de tarefas

Por isso, os dados são **por dispositivo e por navegador**: o quadro do celular não é o mesmo do computador, e limpar os dados do navegador apaga o quadro.

---

## 📌 Rotas

| Rota        | Página                                   |
|-------------|------------------------------------------|
| `/`         | Apresentação da plataforma               |
| `/board`    | Quadro de tarefas (Kanban)               |
| `/tutorial` | Tutorial de uso                          |

---

Feito com 💙 por **Daniel Camillo Silva** — projeto **ZivvuTasks**.
