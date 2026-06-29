
"use client";
import { usePathname } from "next/navigation";
import { ChevronRight, SquareKanban, Clock, TrendingUp, UsersRound, CircleUser, Link } from 'lucide-react';
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";

const route = {
  navigate: (path: string) => {
    window.location.href = path;
  }
}

export default function Home() {
  const pathname = usePathname();

  const navigateToBoard = () => {
    route.navigate("/board");
  }

  return (
  <div className="grid grid-cols-2 gap-5 m-5 items-center w-full h-full align-center justify-center">
    <div className="flex flex-col items-start justify-center w-full h-full m-4 gap-4">
      <div className="flex flex-col items-center justify-center bg-[#BCC7DE] px-5 rounded-full">
      <h1 className="font-mono text-2xl text-[#3E52E8]"> BEM-VINDO</h1>
      </div>
        <h2 className="text-[#111C2D] font-bold text-[3em] 2xl:text-[5em]">Organize sua rotina com simplicidade</h2>
        <p className="text-[#3C475A] 2xl:text-[1.25em] font-light">ZivvuTasks ajuda você a transformar o caos em clareza. Gerencie seus projetos, acompanhe seu progresso e alcance seus objetivos com uma interface limpa e intuitiva.</p>
        <div className="flex flex-row items-center gap-4">
         <button onClick={navigateToBoard} className="bg-[#3E52E8] text-white p-3 rounded-xl hover:cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:bg-[#2C3AB1] transition duration-300 flex flex-row items-center gap-2">
            Ir para o Quadro <ChevronRight />
            </button>
          <button onClick={() => route.navigate("/tutorial")} className="bg-[#FFFFFF] text-[#636363] border border-[#636363] p-3 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:cursor-pointer hover:bg-[#2C3AB1] hover:text-white hover:border-transparent transition duration-300 ">
            Ver Tutorial
            </button>
        </div>
    </div>
      <img src="assets/zivvuimg.png" alt="TaskFlow" className="w-[80%] h-[80%] ml-5 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]"/>

      <div className="col-span-2 flex flex-row items-center justify-center w-full h-full m-4 gap-4">
        <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center w-[25em] h-full m-4 gap-4">
          <div className="flex flex-col items-center justify-center gap-4 bg-[#F5F5F5] p-1">
            <CircleUser size={128} className="text-[#3E52E8] bg-[#BCC7DE] rounded-xl p-1" />
            <h2 className="text-[#3C475A] font-bold text-[1em]">Daniel Camillo Silva</h2>
            <p className="text-[#3C475A] font-light">Desenvolvedor da plataforma <span className="font-bold text-[#3E52E8]">ZivvuTasks</span></p>
              <div className="flex flex-row items-center justify-center gap-4 hover:cursor-pointer">
                 <Link href="https://github.com/danielcamisi" target="_blank">
                   <FaGithub size={24} className="text-[#3C475A] hover:text-[#3E52E8] hover:cursor-pointer" />
                 </Link>
                 <Link href="https://www.instagram.com/zivvusolutions/" target="_blank">
                   <FaInstagram size={24} className="text-[#3C475A] hover:text-[#3E52E8] hover:cursor-pointer" />
                 </Link>
                 <Link href="https://www.tiktok.com/@zivvusolutions" target="_blank">
                   <FaTiktok size={24} className="text-[#3C475A] hover:text-[#3E52E8] hover:cursor-pointer" />
                 </Link>
                </div>
          </div>

        </div>

          <div className="flex flex-col items-start h-full m-4 gap-4">
            <h2 className="text-[#3C475A] text-[1.5em] font-bold">Por que ZivvuTasks?</h2>
            <div className="grid grid-cols-2 gap-4 w-auto h-full">
              <div className="flex flex-row items-center justify-center gap-4 p-[1em] bg-[#F5F5F5] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[25em]">
                <SquareKanban size={48} className="text-[#3E52E8] bg-[#BCC7DE] rounded-xl p-1" />
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-[#3C475A] font-bold text-[1em]">Visualização Clara</h3>
                  <p className="text-[#3C475A] font-light">Arraste e solte tarefas em um quadro Kanban moderno e intuitivo.</p>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center gap-4 p-[1em] bg-[#F5F5F5] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[25em]">
                <Clock size={48} className="text-[#3E52E8] bg-[#BCC7DE] rounded-xl p-1" />
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-[#3C475A] font-bold text-[1em]">Gestão de Tempo</h3>
                  <p className="text-[#3C475A] font-light">Priorize o que importa com lembretes inteligentes e cronogramas.</p>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center gap-4 p-[1em] bg-[#F5F5F5] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[25em]">
                <TrendingUp size={48} width={62} className="text-[#A53D00] bg-[#FFDBCD] rounded-xl p-1" />
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-[#3C475A] font-bold text-[1em]">Acompanhamento de Progresso</h3>
                  <p className="text-[#3C475A] font-light">Visualize o progresso de suas tarefas e projetos com gráficos e indicadores claros.</p>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center gap-4 p-[1em] bg-[#F5F5F5] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[25em]">
                <UsersRound size={48} width={62} className="text-[#A53D00] bg-[#FFDBCD] rounded-xl p-1" />
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-[#3C475A] font-bold text-[1em]">Colaboração Eficiente</h3>
                  <p className="text-[#3C475A] font-light">Trabalhe em equipe de forma eficiente, compartilhando tarefas e atualizações em tempo real.</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
  </div>
  );
}
