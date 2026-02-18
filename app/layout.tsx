import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

// Mantenemos tus metadatos para SEO
export const metadata: Metadata = {
  title: "Dra. Marina Soto | Ultrasonido Diagnóstico",
  description: "Atención profesional y resultados confiables en San Cristóbal de las Casas. Agenda tu ultrasonido hoy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager - Mantenemos tu funcionalidad de tracking */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-5C5PLJ4T'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5C5PLJ4T');
          `}
        </Script>
      </head>

      <body className="antialiased">
        {/* Google Tag Manager (noscript) - Vital para que el tracking no falle */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5C5PLJ4T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}