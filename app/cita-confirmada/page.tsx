"use client";

import Link from "next/link";
import Image from "next/image";

const CONFIG = {
  brandName: "Dra. Marina Soto",
};

export default function CitaConfirmadaPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] flex flex-col justify-between selection:bg-[#9E3A4D]/10">
      
      {/* Header Minimalista */}
      <header className="mx-auto w-full max-w-4xl px-6 py-8 flex justify-center sm:justify-start">
        <Image src="/brand/logotipo-dra.svg" alt={CONFIG.brandName} width={200} height={45} className="opacity-80 drop-shadow-sm" priority />
      </header>

      {/* Contenido Central */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 p-10 sm:p-14 text-center relative overflow-hidden">
          
          {/* Adorno superior sutil */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2A5368] to-[#9E3A4D]"></div>

          <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#25D366]/20">
            <svg className="w-12 h-12 text-[#1EBE5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[#2A5368]/5 text-[#2A5368] text-[10px] font-black uppercase tracking-[0.25em] border border-[#2A5368]/10">
            Paso completado
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
            ¡Gracias por contactarnos!
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
            Tu solicitud está en proceso. <b>La Dra. Marina o su asistente confirmarán tu cita por WhatsApp</b> a la brevedad posible para brindarte la atención que mereces.
          </p>

          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 hover:text-[#2A5368] transition-all duration-300 border border-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Volver al inicio
          </Link>

        </div>
      </div>

      {/* Footer Minimalista */}
      <footer className="py-8 text-center">
         <p className="text-[10px] text-gray-400 mb-2">
           © {new Date().getFullYear()} {CONFIG.brandName}. Todos los derechos reservados.
         </p>
         <a href="https://consultoriagen.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[#2A5368] transition-colors group">
           <span>Diseño y Desarrollo por</span>
           <span className="font-black tracking-tighter text-gray-500 group-hover:text-[#9E3A4D] transition-colors">GENEM.</span>
         </a>
      </footer>
    </main>
  );
}