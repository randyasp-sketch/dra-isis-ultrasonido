"use client"; // <--- ESTA DEBE SER LA LÍNEA 1 ABSOLUTA

import { useState } from "react";
import Image from "next/image";
import { cn } from "./lib/utils";
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
  // DATOS LEGALES (Asegúrate de poner los reales aquí)
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
const depositEnabled = CONFIG.depositUrl !== "PON_AQUI_TU_LINK_DE_MERCADO_PAGO" && CONFIG.depositUrl !== "";

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
        "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-300 active:scale-[0.95] text-center",
        variants[disabled ? "disabled" : (variant as keyof typeof variants)],
        className
      )}
    >
      {children}
    </a>
  );
};

export default function Home() {
  // 1. La canasta que recuerda qué estudios elegiste
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // 2. La función para marcar y desmarcar estudios
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) // Si ya estaba, lo saca
        : [...prev, service]             // Si no estaba, lo mete
    );
  };

  // 3. Preparación del mensaje de WhatsApp con la lista de estudios
  const generateWALink = () => {
    const list = selectedServices.map(s => `• ${s}`).join('%0A'); // Crea la lista con puntitos
    const message = `Hola Dra. Marina, me gustaría solicitar informes y agendar los siguientes estudios:%0A%0A${list}%0A%0A¿Qué disponibilidad tiene?`;
    return `https://wa.me/${CONFIG.whatsappE164}?text=${message}`; // Usa el número de CONFIG
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-[#9E3A4D]/10">
      {/* Fondos Decorativos Suaves */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#9E3A4D]/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] rounded-full bg-[#2A5368]/5 blur-[100px]" />
      </div>

      {/* HEADER CON BOTÓN DE URGENCIAS */}
      <header className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image 
          src="/brand/logotipo-dra.svg" 
          alt={CONFIG.brandName} 
          width={320} 
          height={70} 
          priority 
          className="w-[220px] sm:w-[320px] h-auto" 
        />
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Botón de Urgencias: Sin target="_blank" para evitar errores en móvil */}
          <a 
            href={`tel:${CONFIG.emergencyPhoneRaw}`}
            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-500 group"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-80 group-hover:text-white/90">Urgencias</span>
              <span className="text-sm font-black tracking-tight">{CONFIG.emergencyPhone}</span>
            </div>
          </a>

          <Button href={CONFIG.bookingUrl} className="text-xs">RESERVAR CITA</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[#2A5368] text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="flex h-2 w-2 rounded-full bg-[#9E3A4D] animate-pulse" />
            Especialista en Ultrasonido en San Cristobal de las Casas
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05]">
            Atención que <br /> <span className="text-[#9E3A4D]">te escucha.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Soy la Dra. Isis Marina Soto - Médico radiologo. Mi compromiso es brindarte un diagnóstico preciso con la calidez y el respeto que mereces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Button href={CONFIG.bookingUrl} className="px-12 py-5">Agenda tu cita ahora</Button>
            <Button href={waLink} variant="whatsapp" className="px-10">Cita por WhatsApp</Button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#9E3A4D]/10 to-transparent rounded-[3rem] blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-100">
            <Image src="/brand/foto-dra.jpeg" alt="Dra. Marina Soto" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* SECCIÓN SOBRE LA DRA MARINA */}
      <section className="py-24 bg-white/40 backdrop-blur-sm border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Imagen de Apoyo (Aquí ponemos la foto que veías vacía) */}
          <div className="relative group">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src="/foto-dra-ultrasonido.png" 
                  alt="Dra. Marina Soto en consulta" 
                  width={600} 
                  height={750} 
                  className="rounded-[2.3rem] object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A5368]/40 to-transparent" />
             </div>
             {/* Badge de Años */}
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                <p className="text-2xl font-bold text-[#9E3A4D]">+10000</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Pacientes <br />Atendidos</p>
             </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Más que un estudio, <br /><span className="text-[#2A5368]">tu tranquilidad.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sé que detrás de cada ultrasonido hay una persona buscando respuestas o cuidando de sus seres queridos. Por eso, mi enfoque no es solo técnico; me tomo el tiempo de escucharte y explicarte tus resultados de forma clara y humana.
            </p>
            
            <div className="grid gap-6">
              {[
                { t: "Formación Médica Especializada", d: "Médico General por la UNACH, con especialidad realizada en el Centro Médico Nacional La Raza (UNAM). Mi sólida trayectoria académica respalda la precisión de cada diagnóstico para tu tranquilidad." },
                { t: "Atención Individualizada", d: "Aquí no eres un número más; cada paciente recibe mi atención completa y dedicada." },
                { t: "Interpretación Ética", d: "La importancia de un ultrasonido bien hecho radica en una interpretación honesta y precisa." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#9E3A4D]/10 flex items-center justify-center group-hover:bg-[#9E3A4D] transition-colors">
                    <svg className="w-4 h-4 text-[#9E3A4D] group-hover:text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.t}</h4>
                    <p className="text-gray-500 text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* RECUADRO LEGAL REQUERIDO */}
            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cédula Profesional</p>
                  <p className="text-sm text-[#2A5368] font-bold">{CONFIG.cedulaProfesional}</p>
                </div>
                
                <div className="sm:col-span-2 pt-4 border-t border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Permiso COFEPRIS</p>
                  <p className="text-sm text-[#2A5368] font-bold">2507025036X000977</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* SECCIÓN DE SERVICIOS - ACORDEÓN CON BENEFICIOS INTEGRADOS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6">
          
          {/* Encabezado Principal */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3A4D]/5 text-[#9E3A4D] text-[10px] font-black uppercase tracking-[0.3em] border border-[#9E3A4D]/10">
              Servicios Especializados
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              ¿Qué estudio <span className="text-[#9E3A4D] italic font-serif text-transform: lowercase">necesitas?</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Explora nuestras categorías. Selecciona los estudios para agendar tu cita.
            </p>
          </div>

          {/* Acordeones de Categorías */}
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
  "Colecciones"
                ]
              },
              {
                id: "dop",
                title: "Doppler Especializado",
                color: "#9E3A4D",
                items: [
                  "Carotídeo", "Hepático nativo", "Injerto hepático", "Renal nativo", "Injerto renal", "Arterial miembros", 
                  "Venoso miembros", "Insuficiencia venosa", "Testicular", "Varicocele"
                ]
              },
              {
                id: "mus",
                title: "Músculo Esquelético",
                color: "#2A5368",
                items: [
                  "Hombro", "Codo", "Mano / Muñeca", "Cadera", "Rodilla", "Tobillo", "Tendón de Aquiles"
                ]
              }
            ].map((cat) => (
              <details key={cat.id} className="group border border-gray-100 rounded-[2.5rem] bg-gray-50/30 overflow-hidden transition-all duration-500 open:shadow-2xl open:shadow-gray-200/50 open:bg-white">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none outline-none">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: cat.color }} />
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{cat.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-open:rotate-180 transition-transform duration-500 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </summary>
                
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                    {cat.items.map((item) => {
                      const isSelected = selectedServices.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleService(item)}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left group/btn",
                            isSelected 
                              ? "bg-[#2A5368] border-[#2A5368] text-white shadow-lg" 
                              : "bg-white border-gray-100 text-gray-500 hover:border-[#9E3A4D]/20 hover:text-[#9E3A4D]"
                          )}
                        >
                          <span className="text-[11px] font-bold tracking-wide uppercase">{item}</span>
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center border transition-all",
                            isSelected ? "bg-white/20 border-transparent text-white" : "bg-gray-50 border-gray-100 text-transparent group-hover/btn:border-[#9E3A4D]/30"
                          )}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* DIFERENCIADOR: RESULTADOS AL MOMENTO (Integrado al final del catálogo) */}
          <div className="bg-[#2A5368]/5 border border-[#2A5368]/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E3A4D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-[#9E3A4D] shrink-0">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#2A5368]">Resultados listos al finalizar</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Para tu total tranquilidad, te entregamos tu reporte médico en formato <b>físico y digital</b> inmediatamente al terminar tu estudio. Sin esperas, sin vueltas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* 4. BARRA DE SOLICITUD FLOTANTE (ESTILO IPHONE) */}
  {selectedServices.length > 0 && (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-[#1a1a1a]/85 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-between text-white">
        <div className="pl-4">
          <span className="text-white/50 text-[10px] font-black uppercase tracking-widest leading-none mb-1 block">Seleccionados</span>
          <p className="text-lg font-bold leading-none">
            {selectedServices.length} <span className="text-xs font-medium text-white/60 text-transform: lowercase">estudios</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedServices([])}
            className="px-4 py-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
          >
            Limpiar
          </button>
          <a
            href={generateWALink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
          >
            SOLICITAR POR WHATSAPP
          </a>
        </div>
      </div>
    </div>
  )}

  {/* CTA FINAL RE-DISEÑADO */}
  <section className="py-24 bg-gradient-to-br from-[#2A5368] to-[#1a3a4d] relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E3A4D] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto space-y-8 px-6">
  
  {/* Etiqueta corregida: Fondo blanco, texto vino, sin saltos de línea */}
  <div className="flex justify-center">
    <div className="inline-flex items-center justify-center bg-white px-5 py-2 rounded-full shadow-lg">
      <span className="text-[#9E3A4D] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
        Agenda tu diagnóstico hoy
      </span>
    </div>
  </div>

  <div className="space-y-4">
    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
      No dejes tu tranquilidad <br className="hidden md:block" /> 
      <span className="text-white/80 font-light italic">para después.</span>
    </h2>
    <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
      Obtén la claridad médica que necesitas con la calidez y precisión de la Dra. Isis Marina Soto. Cupos limitados para esta semana.
    </p>
  </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button 
                href={CONFIG.bookingUrl} 
                className="w-full sm:w-auto px-14 py-6 bg-white text-[#2A5368] hover:bg-[#FDFDFD] hover:scale-105 shadow-xl transition-all duration-300 text-base"
              >
                Reservar espacio ahora
              </Button>
              
              <div className="flex flex-col gap-2">
                <Button 
                  href={waLink} 
                  variant="whatsapp" 
                  className="w-full sm:w-auto px-10 py-6 hover:scale-105 transition-all duration-300 text-base"
                >
                  Hablar por WhatsApp
                </Button>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  Respuesta inmediata
                </p>
              </div>
            </div>

          {/* Texto de Urgencias integrado */}
          <div className="pt-8 border-t border-white/10 inline-block">
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">¿Es una urgencia médica?</p>
            <a 
              href={`tel:${CONFIG.emergencyPhoneRaw}`} 
              className="text-white hover:text-[#9E3A4D] transition-colors text-xl font-black flex items-center justify-center gap-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              Llamar al {CONFIG.emergencyPhone}
            </a>
          </div>
        </div>
      </section>

      <footer className="py-16 text-center space-y-8 border-t border-gray-100">
        {/* Datos de la Dra. y Dirección Funcional */}
        <div className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase space-y-4">
          <p className="text-gray-500">Dra. Isis Marina Soto • Especialista en Ultrasonido</p>
          
          {/* Dirección con Link Exacto */}
          <div className="flex flex-col items-center gap-2">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Luxury+Hospital+San+Cristobal+de+las+Casas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-center hover:text-[#9E3A4D] transition-colors duration-300 normal-case tracking-normal text-xs"
            >
              <svg className="w-5 h-5 mb-1 text-[#9E3A4D] opacity-70 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="max-w-[250px]">
                Prudencio Moscoso 26, Col. La Primavera, <br />
                CP 29240, San Cristóbal de Las Casas, Chiapas.
              </span>
            </a>
          </div>

          <span className="block opacity-60">Cofepris: 2507025036X00097</span>
        </div>

        {/* Firma GENEM */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Powered by</p>
          <a 
            href="https://consultoriagen.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center transition-all"
          >
            <div className="mb-2 flex h-8 w-8 items-center justify-center">
              <Image 
                src="/genem.png" 
                alt="Logo GENEM"
                width={28}
                height={28}
                className="object-contain" 
              />
            </div>
            <span className="text-sm font-black text-[#2A5368] group-hover:text-[#9E3A4D] transition-colors tracking-tighter">
              GENEM<span className="text-[#9E3A4D] group-hover:text-[#2A5368]">.</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors lowercase">
              consultoriagen.com
            </span>
          </a>
        </div>
      </footer>
    </main>
  );
}