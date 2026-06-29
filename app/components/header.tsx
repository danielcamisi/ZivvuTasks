"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();

    const [underline, setUnderline] = useState({ left: 0, width: 0, top: 0, opacity: 0 });

    const moverUnderline = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const item = e.currentTarget;
        setUnderline({
            left: item.offsetLeft,
            width: item.offsetWidth,
            top: item.offsetTop + item.offsetHeight + 2, 
            opacity: 1,
        });
    };

    return (
    <div className="flex flex-col items-center w-full bg-[#F5F5F5]">
        <div className="grid grid-cols-3 items-center w-full h-20 p-4 border-b border-[#6b6b6b41] shadow-[0_5px_15px_rgba(0,0,0,0.20)]">
            <h1 className="justify-self-start font-manrope  text-4xl text-center font-bold text-[1.5em] text-[#3E52E8]">
                ZivvuTasks
            </h1>

            {/* relative = referência do underline; onMouseLeave = some ao sair do grupo */}
            <nav
                onMouseLeave={() => setUnderline((u) => ({ ...u, opacity: 0 }))}
                className="relative flex flex-row items-center justify-center h-20 gap-5"
            >
                <Link
                    href="/"
                    onMouseEnter={moverUnderline}
                    className={`px-1 transition-colors ${pathname === "/" ? "text-[#3E52E8] font-bold" : "text-[#1E293B] hover:text-[#3E52E8]"}`}
                >
                    Home
                </Link>
                <Link
                    href="/board"
                    onMouseEnter={moverUnderline}
                    className={`px-1 transition-colors ${pathname === "/board" ? "text-[#3E52E8] font-bold" : "text-[#1E293B] hover:text-[#3E52E8]"}`}
                >
                    Task Board
                </Link>

                {/* underline deslizante */}
                <span
                    className="absolute h-[2px] bg-[#3E52E8] rounded-full transition-all duration-300 ease-out pointer-events-none"
                    style={{
                        left: underline.left,
                        width: underline.width,
                        top: underline.top,
                        opacity: underline.opacity,
                    }}
                />
            </nav>
        </div>
    </div>
    );
}
