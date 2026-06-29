import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center w-full bg-[#F5F5F5] mt-auto">
            <div className="flex flex-row items-center justify-between w-full h-20 p-4">
                <h1 className="font-manrope font-bold text-[1.25em] text-[#3E52E8]">
                    ZivvuTasks
                </h1>

                <p className="text-[#3C475A] font-light text-sm">
                    © 2026 ZivvuTasks. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
