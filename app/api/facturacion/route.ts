import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await request.formData();
    
    // Extraemos los textos
    const nombre = formData.get('nombre') as string;
    const rfc = formData.get('rfc') as string;
    const regimen = formData.get('regimen') as string;
    const cp = formData.get('cp') as string;
    const uso = formData.get('uso') as string;
    const email = formData.get('email') as string;
    const monto = formData.get('monto') as string;
    const concepto = formData.get('concepto') as string;

    // Extraemos los archivos para Resend
    const constancia = formData.get('constancia') as File | null;
    const comprobante = formData.get('comprobante') as File | null;
    const attachments = [];

    if (constancia && constancia.size > 0) {
      const buffer = Buffer.from(await constancia.arrayBuffer());
      attachments.push({ filename: `Constancia_${rfc}_${constancia.name}`, content: buffer });
    }

    if (comprobante && comprobante.size > 0) {
      const buffer = Buffer.from(await comprobante.arrayBuffer());
      attachments.push({ filename: `Pago_${rfc}_${comprobante.name}`, content: buffer });
    }

    // ====================================================================
    // 💥 NUEVA MAGIA: AVISARLE A TASKFLOW (FIREBASE)
    // ====================================================================
    const taskFlowData = { nombreCliente: nombre, rfc, regimen, cp, uso, email, monto, concepto };

    try {
      // Reemplaza esto con la URL real de tu Firebase Function
      const webhookURL = 'https://console.firebase.google.com/project/genem-taskflow-pro/overview'; 
      
      await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskFlowData)
      });
      console.log("✅ Tarea enviada exitosamente a TaskFlow");
    } catch (tfError) {
      // Si TaskFlow falla por alguna razón, no rompemos el proceso, que siga mandando el correo
      console.error("⚠️ Error al enviar a TaskFlow:", tfError);
    }
    // ====================================================================

    // Enviamos el correo con Resend (Se mantienen los archivos aquí)
    const data = await resend.emails.send({
      from: 'Facturación Dra. Marina <notificaciones@consultoriagen.com>', 
      to: process.env.EMAIL_DESTINO as string,
      replyTo: email,
      subject: `Nueva Solicitud de Factura - ${rfc}`,
      attachments: attachments,
      html: `
        <div style="font-family: sans-serif; color: #333; max-w: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px;">
          <h2 style="color: #2A5368; margin-top: 0;">Nueva solicitud de factura médica</h2>
          <p>Un paciente ha solicitado una factura desde <b>dramarinasoto.com</b>:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Paciente / Razón Social:</strong> ${nombre}</p>
            <p style="margin: 5px 0;"><strong>RFC:</strong> ${rfc}</p>
            <p style="margin: 5px 0;"><strong>Régimen Fiscal:</strong> ${regimen}</p>
            <p style="margin: 5px 0;"><strong>Código Postal:</strong> ${cp}</p>
            <p style="margin: 5px 0;"><strong>Uso de CFDI:</strong> ${uso}</p>
            <p style="margin: 5px 0;"><strong>Correo del paciente:</strong> ${email}</p>
          </div>
          <h3 style="color: #9E3A4D;">Detalles del Servicio</h3>
          <p style="margin: 5px 0;"><strong>Monto pagado:</strong> $${monto}</p>
          <p style="margin: 5px 0;"><strong>Concepto/Estudio:</strong> ${concepto}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Enviado automáticamente vía GENEM. Los documentos adjuntos están en este mismo correo.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}