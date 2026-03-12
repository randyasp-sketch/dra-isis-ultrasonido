"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "./lib/utils";
import { useRouter } from "next/navigation";
import "./globals.css";

const CONFIG = {
  brandName: "Dra. Isis Marina Soto",
  specialty: "Ultrasonido Diagnóstico",
  city: "San Cristóbal de las Casas",
  whatsappE164: "5219673119697",
  whatsappPrefill: "Hola Dra. Marina, quiero agendar un ultrasonido...",
  bookingUrl: "https://calendar.app.google/NG2KjyGRDB8gYXUW9",
  depositUrl: "PON_AQUI_TU_LINK_DE_MERCADO_PAGO",
  emergencyPhone: "961 607 8413", // Formato visual para llamadas
  emergencyPhoneRaw: "9616078413", // Formato para el enlace tel:
  cedulaProfesional: "11538775",
  permisoCofepris: "2507025036X00097",
};

const track = (event: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, ...params });
  }
};

const waLink = `https://wa.me/${CONFIG.whatsappE164}?text=${encodeURIComponent(CONFIG.whatsappPrefill)}`;

const Button = ({ href, variant = "primary", children, className, onClick, disabled }: any) => {
  const variants = {
    primary: "bg-[#9E3A4D] text-white hover:bg-[#872F40] shadow-lg shadow-[#9E3A4D]/20",
    secondary: "bg-[#2A5368] text-white hover:bg-[#1f3e4e] shadow-lg shadow-[#2A5368]/20",
    outline: "bg-white text-[#2A5368] border border-gray-200 hover:bg-[#2A5368] hover:text-white",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-lg shadow-[#25D366]/20",
    disabled: "cursor-not-allowed bg-gray-100 text-gray-400 shadow-none",
  };

  return (
    <a
      href={disabled ? undefined : href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-[0.95] text-center cursor-pointer",
        variants[disabled ? "disabled" : (variant as keyof typeof variants)],
        className
      )}
    >
      {children}
    </a>
  );
};

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const router = useRouter(); // Inicializamos el router

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const generateWALink = () => {
    const list = selectedServices.map((s) => `• ${s}`).join("%0A");
    const message = `Hola Dra. Marina, me gustaría solicitar informes y agendar los siguientes estudios:%0A%0A${list}%0A%0A¿Qué disponibilidad tiene?`;
    return `https://wa.me/${CONFIG.whatsappE164}?text=${encodeURIComponent(message)}`;
  };

  // Función mágica: Abre el link en pestaña nueva y redirige la actual a la página de gracias.
  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    e.preventDefault(); // Evitamos que el link normal funcione
    window.open(url, "_blank"); // Abrimos WA o Calendario en otra pestaña
    router.push("/cita-confirmada"); // Mandamos la pestaña actual a la página de gracias
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-[#9E3A4D]/10 overflow-x-hidden">
      {/* Fondos Decorativos Suaves */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#9E3A4D]/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] rounded-full bg-[#2A5368]/5 blur-[100px]" />
      </div>

      {/* HEADER OPTIMIZADO PARA MÓVIL */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <Image
          src="/brand/logotipo-dra.svg"
          alt={CONFIG.brandName}
          width={320}
          height={70}
          priority
          className="w-[200px] sm:w-[280px] md:w-[320px] h-auto"
        />
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={`tel:${CONFIG.emergencyPhoneRaw}`}
            className="flex items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-500 group w-full sm:w-auto"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-80 group-hover:text-white/90">
                Urgencias
              </span>
              <span className="text-sm font-black tracking-tight">
                {CONFIG.emergencyPhone}
              </span>
            </div>
          </a>
          
          {/* Fila de botones 50/50 en celular */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              href={CONFIG.bookingUrl} 
              onClick={(e: any) => handleBookingClick(e, CONFIG.bookingUrl)} 
              className="flex-1 sm:flex-none text-[10px] sm:text-xs px-4"
            >
              RESERVAR
            </Button>
            <Link 
              href="/facturacion" 
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-2xl px-4 py-3.5 sm:py-4 text-[10px] sm:text-xs font-bold bg-white text-[#2A5368] border border-gray-200 hover:bg-[#2A5368] hover:text-white transition-all duration-300 shadow-sm text-center"
            >
              FACTURACIÓN
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[#2A5368] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#9E3A4D] animate-pulse" />
            Especialista en Ultrasonido en San Cristobal de las Casas
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05]">
            Atención que <br className="hidden sm:block"/> <span className="text-[#9E3A4D]">te escucha.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Soy la Dra. Isis Marina Soto - Médico radiólogo. Mi compromiso es
            brindarte un diagnóstico preciso con la calidez y el respeto que
            mereces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-4">
            <Button 
              href={CONFIG.bookingUrl} 
              onClick={(e: any) => handleBookingClick(e, CONFIG.bookingUrl)}
              className="w-full sm:w-auto px-10 py-4 sm:py-5"
            >
              Agenda tu cita ahora
            </Button>
            <Button 
              href={waLink} 
              variant="whatsapp" 
              onClick={(e: any) => handleBookingClick(e, waLink)}
              className="w-full sm:w-auto px-10 py-4 sm:py-5"
            >
              Cita por WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative group px-4 sm:px-0">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#9E3A4D]/10 to-transparent rounded-[3rem] blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white ring-1 ring-gray-100">
            <Image
              src="/brand/foto-dra.jpeg"
              alt="Dra. Marina Soto"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN SOBRE LA DRA */}
      <section className="py-20 md:py-24 bg-white/40 backdrop-blur-sm border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative group px-2 sm:px-0">
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/foto-dra-ultrasonido.png"
                alt="Dra. Marina Soto en consulta"
                width={600}
                height={750}
                className="rounded-[1.8rem] sm:rounded-[2.3rem] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A5368]/40 to-transparent" />
            </div>
            
            {/* Insignia visible en móvil (reducida) y en PC */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center animate-bounce-slow">
              <p className="text-xl sm:text-2xl font-bold text-[#9E3A4D] leading-none">+10k</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mt-1">
                Pacientes <br /> Atendidos
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 mt-6 lg:mt-0">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight text-center md:text-left">
              Más que un estudio, <br />
              <span className="text-[#2A5368]">tu tranquilidad.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left">
              Sé que detrás de cada ultrasonido hay una persona buscando
              respuestas o cuidando de sus seres queridos. Por eso, mi enfoque no
              es solo técnico; me tomo el tiempo de escucharte y explicarte tus
              resultados de forma clara y humana.
            </p>

            <div className="grid gap-5 md:gap-6">
              {[
                {
                  t: "Formación Médica Especializada",
                  d: "Médico General por la UNACH, con especialidad realizada en el Centro Médico Nacional La Raza (UNAM).",
                },
                {
                  t: "Atención Individualizada",
                  d: "Aquí no eres un número más; cada paciente recibe mi atención completa y dedicada.",
                },
                {
                  t: "Interpretación Ética",
                  d: "La importancia de un ultrasonido bien hecho radica en una interpretación honesta y precisa.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group bg-white md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-gray-50 md:border-none shadow-sm md:shadow-none">
                  <div className="flex-shrink-0 w-8 h-8 md:w-6 md:h-6 rounded-full bg-[#9E3A4D]/10 flex items-center justify-center group-hover:bg-[#9E3A4D] transition-colors mt-1 md:mt-0">
                    <svg
                      className="w-4 h-4 md:w-3 md:h-3 text-[#9E3A4D] group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.t}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8 rounded-[2rem] bg-gray-50 border border-gray-100 shadow-inner">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Cédula Prof.
                  </p>
                  <p className="text-xs md:text-sm text-[#2A5368] font-bold">
                    {CONFIG.cedulaProfesional}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Permiso COFEPRIS
                  </p>
                  <p className="text-xs md:text-sm text-[#2A5368] font-bold break-all">
                    2507025036X000977
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section className="py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3A4D]/5 text-[#9E3A4D] text-[10px] font-black uppercase tracking-[0.3em] border border-[#9E3A4D]/10">
              Servicios Especializados
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              ¿Qué estudio{" "}
              <span className="text-[#9E3A4D] italic font-serif text-transform: lowercase">
                necesitas?
              </span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm font-medium px-4">
              Explora nuestras categorías. Selecciona los estudios para agendar tu cita.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {[
              {
                id: "conv",
                title: "Ultrasonidos Convencionales",
                color: "#2A5368",
                items: [
                  "Cuello y Tiroides",
                  "Mama",
                  "Abdomen completo",
                  "Abdomen superior",
                  "Hígado y vías biliares",
                  "Renal y vejiga",
                  "Renal y prostático",
                  "Prostático",
                  "Testicular",
                  "Pélvico",
                  "Endovaginal",
                  "Obstétrico",
                  "Tejidos blandos",
                  "Apendicular",
                  "Píloro",
                  "Inguinal",
                  "Colecciones",
                ],
              },
              {
                id: "dop",
                title: "Doppler Especializado",
                color: "#9E3A4D",
                items: [
                  "Carotídeo",
                  "Hepático nativo",
                  "Injerto hepático",
                  "Renal nativo",
                  "Injerto renal",
                  "Arterial miembros",
                  "Venoso miembros",
                  "Insuficiencia venosa",
                  "Testicular",
                  "Varicocele",
                ],
              },
              {
                id: "mus",
                title: "Músculo Esquelético",
                color: "#2A5368",
                items: [
                  "Hombro",
                  "Codo",
                  "Mano / Muñeca",
                  "Cadera",
                  "Rodilla",
                  "Tobillo",
                  "Tendón de Aquiles",
                ],
              },
            ].map((cat) => (
              <details
                key={cat.id}
                className="group border border-gray-100 rounded-[2rem] md:rounded-[2.5rem] bg-gray-50/30 overflow-hidden transition-all duration-500 open:shadow-xl open:shadow-gray-200/50 open:bg-white"
              >
                <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none outline-none">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className="w-1.5 h-6 md:h-8 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-open:rotate-180 transition-transform duration-500 shadow-sm shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="px-4 sm:px-8 pb-6 md:pb-8 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 pt-4 md:pt-6 border-t border-gray-100">
                    {cat.items.map((item) => {
                      const isSelected = selectedServices.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleService(item)}
                          className={cn(
                            "flex items-center justify-between p-3.5 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 text-left group/btn",
                            isSelected
                              ? "bg-[#2A5368] border-[#2A5368] text-white shadow-md"
                              : "bg-white border-gray-100 text-gray-500 hover:border-[#9E3A4D]/20 hover:text-[#9E3A4D]"
                          )}
                        >
                          <span className="text-[10px] md:text-[11px] font-bold tracking-wide uppercase">
                            {item}
                          </span>
                          <div
                            className={cn(
                              "w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border transition-all shrink-0",
                              isSelected
                                ? "bg-white/20 border-transparent text-white"
                                : "bg-gray-50 border-gray-100 text-transparent group-hover/btn:border-[#9E3A4D]/30"
                            )}
                          >
                            <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="bg-[#2A5368]/5 border border-[#2A5368]/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E3A4D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-[#9E3A4D] shrink-0">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg md:text-xl font-bold text-[#2A5368]">
                  Resultados listos al finalizar
                </h4>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                  Para tu total tranquilidad, te entregamos tu reporte médico en
                  formato <b>físico y digital</b> inmediatamente al terminar tu
                  estudio. Sin esperas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA FLOTANTE */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/20 rounded-3xl sm:rounded-[2.5rem] p-3 sm:p-4 shadow-2xl flex items-center justify-between text-white">
            <div className="pl-3 sm:pl-4">
              <span className="text-white/50 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none mb-1 block">
                Seleccionados
              </span>
              <p className="text-base sm:text-lg font-bold leading-none">
                {selectedServices.length}{" "}
                <span className="text-[10px] sm:text-xs font-medium text-white/60 text-transform: lowercase">
                  estudios
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedServices([])}
                className="hidden sm:block px-4 py-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
              >
                Limpiar
              </button>
              <a
                href={generateWALink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e: any) => handleBookingClick(e, generateWALink())}
                className="bg-[#25D366] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#25D366]/20 text-center cursor-pointer"
              >
                SOLICITAR <span className="hidden sm:inline">POR WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA FINAL */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#2A5368] to-[#1a3a4d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E3A4D] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-8 px-4 sm:px-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center bg-white px-4 py-1.5 rounded-full shadow-lg">
              <span className="text-[#9E3A4D] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                Agenda tu diagnóstico hoy
              </span>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              No dejes tu tranquilidad <br className="hidden md:block" />
              <span className="text-white/80 font-light italic">
                para después.
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
              Obtén la claridad médica que necesitas con la calidez y precisión de
              la Dra. Isis Marina Soto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4">
            <Button
              href={CONFIG.bookingUrl}
              onClick={(e: any) => handleBookingClick(e, CONFIG.bookingUrl)}
              className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-6 bg-white text-[#2A5368] hover:bg-[#FDFDFD] hover:scale-105 shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              Reservar espacio ahora
            </Button>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button
                href={waLink}
                variant="whatsapp"
                onClick={(e: any) => handleBookingClick(e, waLink)}
                className="w-full sm:w-auto px-10 py-4 sm:py-6 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Hablar por WhatsApp
              </Button>
              <p className="text-[9px] sm:text-[10px] text-white/40 font-bold uppercase tracking-widest text-center">
                Respuesta inmediata
              </p>
            </div>
          </div>

          {/* Texto de Urgencias centrado */}
          <div className="pt-10 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10 text-center">
            <p className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0">
              ¿Es una urgencia médica?
            </p>
            <a
              href={`tel:${CONFIG.emergencyPhoneRaw}`}
              className="text-white hover:text-[#9E3A4D] transition-colors text-lg sm:text-xl font-black flex items-center justify-center gap-3"
            >
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Llamar al {CONFIG.emergencyPhone}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER REDISEÑADO */}
      <footer className="py-10 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-8 items-center md:items-start text-center md:text-left">
          
          {/* COLUMNA 1: DIRECCIÓN */}
          <div className="flex flex-col space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Ubicación
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Luxury+Hospital+San+Cristobal+de+las+Casas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 text-xs text-gray-600 hover:text-[#9E3A4D] transition-colors"
            >
               <svg className="w-4 h-4 text-[#9E3A4D] opacity-80 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
               <span>
                 Prudencio Moscoso 26, Col. La Primavera. <br className="hidden md:block"/>
                 San Cristóbal de Las Casas.
               </span>
            </a>
          </div>

          {/* COLUMNA 2: LEGAL */}
          <div className="flex flex-col space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Legal
            </p>
            <div className="flex flex-col text-xs text-gray-600">
              <span>Cofepris: 2507025036X00097</span>
              <Link 
                href="/aviso-de-privacidad" 
                className="underline hover:text-[#9E3A4D] transition-colors mt-1"
              >
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>
        
        {/* FIRMA GENEM SUTIL */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
           <p className="text-[10px] text-gray-400">
             © {new Date().getFullYear()} {CONFIG.brandName}. Todos los derechos reservados.
           </p>
           
           <a 
             href="https://consultoriagen.com" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[#2A5368] transition-colors group"
           >
             <span>Diseño y Desarrollo por</span>
             <span className="font-black tracking-tighter text-gray-500 group-hover:text-[#9E3A4D] transition-colors">GENEM.</span>
           </a>
        </div>
      </footer>
    </main>
  );
}