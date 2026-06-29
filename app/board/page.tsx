"use client";
import { Plus, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

// ================== Tipos ==================
type Coluna = { id: string; nome: string };
type Task = { id: string; titulo: string; descricao: string; colunaId: string };

// ============ Configurações fixas ============
// Colunas que aparecem na primeira vez (mínimo 5)
const COLUNAS_PADRAO: Coluna[] = [
  { id: "col-1", nome: "A Fazer" },
  { id: "col-2", nome: "Em Progresso" },
  { id: "col-3", nome: "Em Revisão" },
  { id: "col-4", nome: "Concluído" },
  { id: "col-5", nome: "Cancelado" },
];

const LIMITE_COLUNAS = 8;              // não deixa passar de 8 colunas
const CHAVE_COLUNAS = "zivvu_colunas"; // chaves usadas no localStorage
const CHAVE_TASKS = "zivvu_tasks";

export default function Board() {
  // ---- Estado que será PERSISTIDO ----
  const [colunas, setColunas] = useState<Coluna[]>(COLUNAS_PADRAO);
  const [tasks, setTasks] = useState<Task[]>([]);
  // flag pra saber se já lemos o localStorage (evita sobrescrever com o padrão)
  const [carregado, setCarregado] = useState(false);

  // ---- Estado do drag and drop ----
  const [arrastando, setArrastando] = useState<string | null>(null);   // id da tarefa arrastada
  const [colunaHover, setColunaHover] = useState<string | null>(null); // coluna sob o cursor

  // ---- Estado só do modal de criar tarefa ----
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [colunaAlvo, setColunaAlvo] = useState("col-1");

  // 1) CARREGA do localStorage uma única vez, já no navegador.
  //    (localStorage não existe no servidor, por isso fica dentro do useEffect)
  useEffect(() => {
    const c = localStorage.getItem(CHAVE_COLUNAS);
    const t = localStorage.getItem(CHAVE_TASKS);
    if (c) setColunas(JSON.parse(c));
    if (t) setTasks(JSON.parse(t));
    setCarregado(true);
  }, []);

  // 2) SALVA toda vez que colunas/tasks mudarem — mas só DEPOIS de carregar.
  useEffect(() => {
    if (!carregado) return;
    localStorage.setItem(CHAVE_COLUNAS, JSON.stringify(colunas));
    localStorage.setItem(CHAVE_TASKS, JSON.stringify(tasks));
  }, [colunas, tasks, carregado]);

  // ================== Ações de COLUNA ==================
  function adicionarColuna() {
    if (colunas.length >= LIMITE_COLUNAS) return;
    setColunas([...colunas, { id: crypto.randomUUID(), nome: "Nova Coluna" }]);
  }
  function renomearColuna(id: string, nome: string) {
    setColunas(colunas.map((c) => (c.id === id ? { ...c, nome } : c)));
  }
  function removerColuna(id: string) {
    setColunas(colunas.filter((c) => c.id !== id));
    setTasks(tasks.filter((t) => t.colunaId !== id)); // apaga tarefas órfãs
  }

  // ================== Ações de TAREFA ==================
  function criarTarefa(e: React.FormEvent) {
    e.preventDefault(); // impede o recarregamento da página
    if (!titulo.trim()) return;
    const nova: Task = {
      id: crypto.randomUUID(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      colunaId: colunaAlvo,
    };
    setTasks([...tasks, nova]);
    setTitulo("");
    setDescricao("");
    setIsOpen(false);
  }
  function moverTarefa(taskId: string, colunaId: string) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, colunaId } : t)));
  }
  function removerTarefa(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function abrirModal() {
    setColunaAlvo(colunas[0]?.id ?? "");
    setIsOpen(true);
  }

  // ================== Drag and Drop ==================
  // soltou numa coluna → move a tarefa que estava sendo arrastada
  function aoSoltar(colunaId: string) {
    if (arrastando) moverTarefa(arrastando, colunaId);
    setArrastando(null);
    setColunaHover(null);
  }

  const noLimite = colunas.length >= LIMITE_COLUNAS;

  return (
    // flex-1 = ocupa toda a altura que sobra entre o Header e o Footer
    <div className="flex flex-col flex-1 p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#111C2D]">Board de tarefas</h1>
          <p className="text-[#3C475A] font-light">
            {colunas.length} colunas · {tasks.length} tarefas · salvo automaticamente
          </p>
        </div>
        <button
          onClick={abrirModal}
          className="bg-[#3E52E8] text-white p-3 rounded-xl hover:cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:bg-[#2C3AB1] transition duration-300 flex items-center gap-2"
        >
          Criar tarefa <Plus size={16} />
        </button>
      </div>

      {/* Linha de colunas: flex-1 = altura cheia; items-stretch = colunas da mesma altura */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 flex-1 items-stretch">
        {colunas.map((col) => {
          const tarefasDaColuna = tasks.filter((t) => t.colunaId === col.id);
          const ativa = colunaHover === col.id; // destaque ao arrastar por cima
          return (
            // ===== ALVO do drop =====
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault(); // SEM isto o onDrop nunca dispara
                setColunaHover(col.id);
              }}
              onDrop={() => aoSoltar(col.id)}
              className={`rounded-xl p-3 w-[18em] shrink-0 flex flex-col border-2 border-dashed transition-colors ${
                ativa ? "border-[#3E52E8] bg-[#EEF1FF]" : "border-[#BCC7DE] bg-[#F5F5F5]"
              }`}
            >
              {/* Topo da coluna: nome EDITÁVEL + contador + apagar */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <input
                  value={col.nome}
                  onChange={(e) => renomearColuna(col.id, e.target.value)}
                  className="bg-transparent font-bold text-[#3E52E8] w-full outline-none"
                />
                <span className="text-xs text-[#3C475A] bg-[#BCC7DE] rounded-full px-2 shrink-0">
                  {tarefasDaColuna.length}
                </span>
                <button
                  onClick={() => removerColuna(col.id)}
                  className="text-[#3C475A] hover:text-red-500 hover:cursor-pointer shrink-0"
                  title="Apagar coluna"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Cards: flex-1 ocupa a altura; overflow-y-auto rola se tiver muitos */}
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto min-h-[4em]">
                {tarefasDaColuna.map((t) => (
                  // ===== FONTE do drag =====
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setArrastando(t.id)}
                    onDragEnd={() => {
                      setArrastando(null);
                      setColunaHover(null);
                    }}
                    className="bg-white rounded-lg p-3 shadow-[0_3px_10px_rgba(0,0,0,0.12)] cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-[#111C2D]">{t.titulo}</h3>
                      <button
                        onClick={() => removerTarefa(t.id)}
                        className="text-[#3C475A] hover:text-red-500 hover:cursor-pointer shrink-0"
                        title="Apagar tarefa"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {t.descricao && (
                      <p className="text-sm text-[#3C475A] mt-1">{t.descricao}</p>
                    )}

                    {/* Atalho pra mover (útil no toque, onde o arrastar não funciona) */}
                    <select
                      value={t.colunaId}
                      onChange={(e) => moverTarefa(t.id, e.target.value)}
                      className="mt-2 text-xs text-[#3C475A] border border-gray-200 rounded p-1 w-full hover:cursor-pointer"
                    >
                      {colunas.map((c) => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {tarefasDaColuna.length === 0 && (
                  <p className="text-xs text-[#9aa3b2] text-center py-4">
                    Arraste tarefas pra cá
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Botão de adicionar coluna (self-start = não estica na vertical) */}
        <button
          onClick={adicionarColuna}
          disabled={noLimite}
          className="shrink-0 self-start w-[12em] py-3 rounded-xl border-2 border-dashed border-[#BCC7DE] text-[#3E52E8] font-bold hover:bg-[#F5F5F5] transition duration-300 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {noLimite ? "Limite de 8 colunas" : "+ Nova Coluna"}
        </button>
      </div>

      {/* ================== Modal: Criar Tarefa ================== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-[modalFade_200ms_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl flex flex-col w-[30em] shadow-xl animate-[modalZoom_200ms_ease-out]"
          >
            <h2 className="text-xl font-bold mb-4 text-[#3E52E8]">Criar Tarefa</h2>
            <form onSubmit={criarTarefa} className="flex flex-col gap-2">
              <label className="text-[#3C475A] text-sm">Nome da tarefa</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
                autoFocus
                className="border border-gray-300 p-2 rounded-lg text-[#111C2D] placeholder:text-gray-400 outline-none focus:border-[#3E52E8]"
              />

              <label className="text-[#3C475A] text-sm mt-2">Descrição da tarefa</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição (opcional)"
                className="border border-gray-300 p-2 rounded-lg text-[#111C2D] placeholder:text-gray-400 outline-none focus:border-[#3E52E8]"
              />

              <label className="text-[#3C475A] text-sm mt-2">Coluna</label>
              <select
                value={colunaAlvo}
                onChange={(e) => setColunaAlvo(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-[#111C2D] outline-none focus:border-[#3E52E8] hover:cursor-pointer"
              >
                {colunas.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>

              <div className="flex flex-row items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-[#636363] border border-[#636363] p-3 rounded-xl hover:cursor-pointer hover:bg-gray-100 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#3E52E8] text-white p-3 rounded-xl hover:cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:bg-[#2C3AB1] transition duration-300"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
