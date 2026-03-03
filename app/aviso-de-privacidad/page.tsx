import Link from "next/link";

export default function AvisoPrivacidad() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Botón de Regresar */}
        <Link href="/" className="inline-flex items-center text-[#9E3A4D] font-bold text-sm hover:underline mb-8">
          ← Regresar al inicio
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#2A5368]">Aviso de Privacidad Integral</h1>
        
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p className="font-bold">Última actualización: Marzo 2026</p>

          <p>
            La <strong>Dra. Isis Marina Soto</strong>, con domicilio en Prudencio Moscoso 26, Col. La Primavera, CP 29240, San Cristóbal de Las Casas, Chiapas, es la responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
          </p>

          <h3 className="text-xl font-bold text-[#2A5368]">¿Para qué fines utilizaremos sus datos personales?</h3>
          <p>
            Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Creación y actualización de su expediente clínico.</li>
            <li>Prestación de servicios médicos de ultrasonido diagnóstico.</li>
            <li>Contacto para confirmación de citas, envío de resultados o seguimiento médico.</li>
            <li>Facturación y cobro.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#2A5368]">¿Qué datos personales utilizaremos?</h3>
          <p>
            Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Datos de identificación (Nombre, edad, fecha de nacimiento).</li>
            <li>Datos de contacto (Teléfono, correo electrónico).</li>
            <li><strong>Datos sensibles:</strong> Estado de salud actual y antecedentes médicos necesarios para la correcta interpretación de su estudio.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#2A5368]">Derechos ARCO</h3>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
          </p>
          <p>
            Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del correo electrónico o directamente en nuestro consultorio.
          </p>
        </div>
        
        <div className="pt-8 border-t border-gray-200 mt-12">
           <Link href="/" className="px-6 py-3 bg-[#2A5368] text-white rounded-xl font-bold text-sm hover:bg-[#1f3e4e] transition-colors">
             Volver a la página principal
           </Link>
        </div>
      </div>
    </main>
  );
}