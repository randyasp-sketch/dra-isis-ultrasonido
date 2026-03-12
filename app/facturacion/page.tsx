"use client";

import { useState } from "react";
import Link from "next/link";

const CONFIG = {
  brandName: "Dra. Marina Soto",
};

export default function FacturacionPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [constanciaFile, setConstanciaFile] = useState<File | null>(null);
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/facturacion", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setConstanciaFile(null);
    setComprobanteFile(null);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-10 px-4 sm:px-6 relative selection:bg-[#9E3A4D]/10">
      
      {/* Header Superior - LOGO CORREGIDO PARA MAXIMA NITIDEZ */}
      <div className="max-w-4xl mx-auto mb-10 flex justify-between items-center">
        <Link href="/" className="inline-flex items-center text-[#2A5368] font-bold text-sm hover:text-[#9E3A4D] transition-colors gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          Volver
        </Link>
        {/* Usamos <img> clásico para que el SVG no pierda resolución */}
        <img src="/brand/logotipo-dra.svg" alt={CONFIG.brandName} className="h-8 md:h-10 w-auto" />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden relative">
        
        {/* Adorno superior sutil */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2A5368] via-[#2A5368]/80 to-[#9E3A4D]"></div>

        <div className="p-8 sm:p-14">
          
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#2A5368]/5 text-[#2A5368] text-xs font-black uppercase tracking-[0.25em] border border-[#2A5368]/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Facturación
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              Solicita tu <span className="text-[#9E3A4D]">Factura</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Completa la información a continuación con los datos exactos de tu Constancia de Situación Fiscal 4.0.
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-[#25D366]/5 text-[#1EBE5D] p-12 rounded-[2rem] border border-[#25D366]/20 text-center space-y-5 animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#25D366]/20 mb-6 border border-[#25D366]/10">
                <svg className="w-12 h-12 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-extrabold text-3xl text-gray-900 tracking-tight">¡Enviado con éxito!</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Hemos recibido tus datos y documentos. Emitiremos tu factura en las próximas 24-48 hrs hábiles.
                <br/><br/>
                Para dudas, escríbenos a <a href="mailto:contacto@dramarinasoto.com" className="font-bold text-[#2A5368] hover:text-[#9E3A4D] transition-colors underline decoration-[#2A5368]/30 underline-offset-4">contacto@dramarinasoto.com</a>
              </p>
              <button onClick={resetForm} className="mt-8 px-8 py-3 rounded-full bg-white text-sm font-bold text-[#2A5368] border border-gray-300 hover:border-[#2A5368] hover:text-[#9E3A4D] transition-all shadow-sm">
                Enviar nueva solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10 relative pb-24 sm:pb-0">
              
              {/* BLOQUE 1: DATOS FISCALES */}
              <div className="bg-gray-50/80 p-6 sm:p-8 rounded-[2rem] border border-gray-200">
                <h2 className="text-sm font-black text-[#2A5368] uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#2A5368]/10 flex items-center justify-center text-sm border border-[#2A5368]/20">1</span>
                  Datos del Contribuyente
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">RFC *</label>
                    <input required name="rfc" type="text" placeholder="XAXX010101000" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#2A5368]/30 focus:border-[#2A5368] outline-none transition-all uppercase text-base font-medium text-gray-900 placeholder:normal-case placeholder:font-normal placeholder:text-gray-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Razón Social o Nombre *</label>
                    <input required name="nombre" type="text" placeholder="Tal cual viene en la constancia" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#2A5368]/30 focus:border-[#2A5368] outline-none transition-all uppercase text-base font-medium text-gray-900 placeholder:normal-case placeholder:font-normal placeholder:text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Código Postal *</label>
                    <input required name="cp" type="text" maxLength={5} placeholder="00000" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#2A5368]/30 focus:border-[#2A5368] outline-none transition-all text-base font-medium text-gray-900 placeholder:text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Correo Electrónico *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                      </div>
                      <input required name="email" type="email" placeholder="correo@ejemplo.com" className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#2A5368]/30 focus:border-[#2A5368] outline-none transition-all text-base font-medium text-gray-900 placeholder:text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Régimen Fiscal *</label>
                    <select required name="regimen" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#2A5368]/30 focus:border-[#2A5368] outline-none transition-all text-base font-medium text-gray-800 cursor-pointer">
                      <option value="">Selecciona una opción...</option>
                      <option value="601">601 - General de Ley Personas Morales</option>
                      <option value="605">605 - Sueldos y Salarios e Ingresos Asimilados</option>
                      <option value="606">606 - Arrendamiento</option>
                      <option value="612">612 - Personas Físicas con Actividades Empresariales</option>
                      <option value="616">616 - Sin obligaciones fiscales</option>
                      <option value="621">621 - Incorporación Fiscal</option>
                      <option value="626">626 - Régimen Simplificado de Confianza (RESICO)</option>
                      <option value="Otro">Otro (Especifique en correo)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* BLOQUE 2: SERVICIO Y DOCUMENTOS */}
              <div className="bg-[#9E3A4D]/[0.03] p-6 sm:p-8 rounded-[2rem] border border-[#9E3A4D]/20">
                <h2 className="text-sm font-black text-[#9E3A4D] uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#9E3A4D]/10 flex items-center justify-center text-sm border border-[#9E3A4D]/20">2</span>
                  Servicio y Documentos
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Uso de CFDI *</label>
                    <select required name="uso" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#9E3A4D]/30 focus:border-[#9E3A4D] outline-none transition-all text-base font-medium text-gray-800 cursor-pointer">
                      <option value="">Selecciona una opción...</option>
                      <option value="D01" className="font-bold text-[#2A5368]">D01 - Honorarios médicos, dentales y gastos hospitalarios</option>
                      <option value="D02">D02 - Gastos médicos por incapacidad y discapacidad</option>
                      <option value="G03">G03 - Gastos en general</option>
                      <option value="S01">S01 - Sin efectos fiscales</option>
                      <option value="CP01">CP01 - Pagos</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Estudio Realizado *</label>
                    <input required name="concepto" type="text" placeholder="Ej. Ultrasonido Obstétrico" className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#9E3A4D]/30 focus:border-[#9E3A4D] outline-none transition-all text-base font-medium text-gray-900 placeholder:font-normal placeholder:text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">Monto Pagado *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold text-lg">$</span>
                      </div>
                      <input required name="monto" type="number" placeholder="800" className="w-full pl-9 pr-5 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#9E3A4D]/30 focus:border-[#9E3A4D] outline-none transition-all text-base font-bold text-gray-900 placeholder:font-normal placeholder:text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Zonas de Drop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-[#9E3A4D]/10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider pl-1">
                      Constancia Fiscal <span className="font-normal lowercase text-gray-400">(Opcional)</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${constanciaFile ? 'border-[#25D366] bg-[#25D366]/5' : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-[#2A5368]/50'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {constanciaFile ? (
                           <p className="text-sm font-bold text-[#1EBE5D] flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> {constanciaFile.name.substring(0, 15)}...</p>
                        ) : (
                          <>
                            <svg className="w-7 h-7 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <p className="text-xs text-gray-600 font-bold">Subir PDF o Imagen</p>
                          </>
                        )}
                      </div>
                      <input name="constancia" type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => setConstanciaFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#9E3A4D] uppercase tracking-wider pl-1">
                      Comprobante de Pago *
                    </label>
                    <label className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all ${comprobanteFile ? 'border-[#25D366] bg-[#25D366]/5' : 'border-[#9E3A4D]/40 bg-white hover:bg-[#9E3A4D]/5 hover:border-[#9E3A4D]/60'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {comprobanteFile ? (
                           <p className="text-sm font-bold text-[#1EBE5D] flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> {comprobanteFile.name.substring(0, 15)}...</p>
                        ) : (
                          <>
                            <svg className="w-7 h-7 mb-2 text-[#9E3A4D]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-xs text-[#9E3A4D] font-bold">Adjuntar Archivo</p>
                          </>
                        )}
                      </div>
                      <input required name="comprobante" type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => setComprobanteFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </div>
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 text-sm font-bold text-center flex items-center justify-center gap-2 animate-pulse">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Error al enviar. Verifica que tus archivos no superen los 10MB e intenta de nuevo.
                </div>
              )}

              {/* Botón Sticky en Móvil */}
              <div className="fixed sm:relative bottom-0 left-0 right-0 p-5 sm:p-0 bg-white/90 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-t border-gray-200 sm:border-none z-50">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full px-12 py-4 sm:py-5 bg-gradient-to-r from-[#2A5368] to-[#1f3e4e] text-white text-base font-extrabold rounded-2xl hover:shadow-xl hover:shadow-[#2A5368]/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Enviando de forma segura...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 flex flex-col items-center justify-center gap-2 pb-10">
         <p className="text-xs text-gray-500 font-medium">
           © {new Date().getFullYear()} {CONFIG.brandName}. Todos los derechos reservados.
         </p>
         <a href="https://consultoriagen.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#2A5368] transition-colors group">
           <span>Diseño y Desarrollo por</span>
           <span className="font-black tracking-tighter text-gray-500 group-hover:text-[#9E3A4D] transition-colors">GENEM.</span>
         </a>
      </div>
    </main>
  );
}