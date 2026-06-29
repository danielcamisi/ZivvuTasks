import Link from "next/link";
import {
  SquareKanban,
  Plus,
  Columns3,
  MoveRight,
  Database,
  Trash2,
  Lightbulb,
  ChevronRight,
} from "lucide-react";

// Página estática (Server Component) — não usa estado nem eventos,
// então não precisa de "use client".
export default function Tutorial() {
  const passos = [
    {
      icon: <Columns3 size={28} />,
      titulo: "1. Organize por colunas",
      texto:
        "O quadro começa com 5 colunas de status (A Fazer, Em Progresso, Em Revisão, Concluído e Cancelado). Clique no nome de qualquer coluna para renomeá-la do seu jeito.",
    },
    {
      icon: <Plus size={28} />,
      titulo: "2. Crie tarefas",
      texto:
        "Use o botão “Criar tarefa” para abrir o formulário. Dê um título, uma descrição opcional e escolha em qual coluna a tarefa deve nascer.",
    },
    {
      icon: <MoveRight size={28} />,
      titulo: "3. Mova entre status",
      texto:
        "Cada cartão tem um seletor para trocar de coluna conforme a tarefa avança. Em breve isso também funcionará por arrastar e soltar (drag and drop).",
    },
    {
      icon: <SquareKanban size={28} />,
      titulo: "4. Adicione colunas",
      texto:
        "Precisa de mais etapas no seu fluxo? Use “+ Nova Coluna”. Você pode ter até 8 colunas — o botão trava automaticamente ao atingir o limite.",
    },
    {
      icon: <Database size={28} />,
      titulo: "5. Tudo salvo sozinho",
      texto:
        "Colunas e tarefas são guardadas no localStorage do seu navegador. Pode fechar a aba e voltar depois: seu quadro continua exatamente como você deixou.",
    },
    {
      icon: <Trash2 size={28} />,
      titulo: "6. Limpe quando quiser",
      texto:
        "Apague tarefas pelo “✕” do cartão e colunas pela lixeira do topo. Atenção: apagar uma coluna remove também as tarefas que estavam nela.",
    },
  ];

  const dicas = [
    "Renomeie as colunas para refletir o SEU fluxo (ex.: “Ideias”, “Bloqueado”, “Em testes”).",
    "Use descrições curtas e objetivas — o cartão fica mais fácil de ler num relance.",
    "Como os dados ficam no navegador, eles são por dispositivo: o quadro do celular não é o mesmo do PC.",
  ];

  return (
    <div className="flex flex-col items-center w-full px-6 py-10 gap-12">
      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-4 max-w-3xl">
        <div className="flex items-center gap-2 bg-[#BCC7DE] text-[#3E52E8] font-mono px-4 py-1 rounded-full">
          <SquareKanban size={18} /> TUTORIAL
        </div>
        <h1 className="text-[#111C2D] font-bold text-[2.5em] leading-tight">
          Como usar a <span className="text-[#3E52E8]">ZivvuTasks</span>
        </h1>
        <p className="text-[#3C475A] font-light text-[1.1em]">
          A ZivvuTasks transforma o caos em clareza. É um quadro estilo Kanban
          onde você organiza suas tarefas em colunas por status, cria novas
          etapas conforme precisa e tem tudo salvo automaticamente no seu
          navegador. Veja abaixo o passo a passo.
        </p>
      </section>

      {/* Passos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {passos.map((p) => (
          <div
            key={p.titulo}
            className="flex flex-col items-start gap-3 bg-[#F5F5F5] rounded-xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition duration-300"
          >
            <div className="text-[#3E52E8] bg-[#BCC7DE] rounded-xl p-2">
              {p.icon}
            </div>
            <h3 className="text-[#111C2D] font-bold text-[1.15em]">{p.titulo}</h3>
            <p className="text-[#3C475A] font-light">{p.texto}</p>
          </div>
        ))}
      </section>

      {/* Dicas */}
      <section className="flex flex-col gap-4 w-full max-w-3xl bg-white border border-[#BCC7DE] rounded-xl p-6">
        <div className="flex items-center gap-2 text-[#3E52E8] font-bold text-[1.25em]">
          <Lightbulb size={22} /> Dicas rápidas
        </div>
        <ul className="flex flex-col gap-3">
          {dicas.map((d) => (
            <li key={d} className="flex items-start gap-3 text-[#3C475A]">
              <ChevronRight size={18} className="text-[#3E52E8] mt-1 shrink-0" />
              <span className="font-light">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Chamada para ação */}
      <Link
        href="/board"
        className="bg-[#3E52E8] text-white px-6 py-3 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:bg-[#2C3AB1] transition duration-300 flex items-center gap-2 font-bold"
      >
        Ir para o Quadro <ChevronRight size={20} />
      </Link>
    </div>
  );
}
