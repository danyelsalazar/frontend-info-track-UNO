// Archivo: Recursos.jsx
import Header from '../components/Header';

export default function Recursos() {
  // 1. Guardamos todo el código HTML en una constante de texto
  const codigoHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Centro de Comando</title>
      <style>
        /* Aquí adentro se verá el CSS que generó Claude */
        body { font-family: system-ui, sans-serif; padding: 20px; background: #f4f4f9; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Centro de Comando de Marca Personal</h1>
        <p>Tu artefacto ya funciona localmente sin bloqueos de seguridad.</p>
      </div>

      <script>
        // Aquí adentro se verá el JavaScript que generó Claude
        console.log("Artefacto cargado con éxito");
      </script>
    </body>
    </html>
  `; // <- Asegúrate de cerrar con la comilla invertida aquí

  // 2. Renderizamos el iframe apuntando a nuestra constante
  return (
    <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}>
      <Header/>
      <iframe
        title="centro-comando-marca-personal"
        srcDoc={codigoHtml} // <- Aquí inyectamos el HTML
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="clipboard-write"
        allowFullScreen={true}
      />
    </div>
  );
}

