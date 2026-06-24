import data from "../data/infotrack_data (1).json";

export const Calendario = () => {
  const { news } = data;
  return (
    <main className="page-content">
      <section className="section-novedades">
        <div className="section-header">
          <span className="section-badge">CALENDARIO</span>
          <h2>Calendario académico</h2>
          <p className="section-sub">
            Enterate de las fechas importantes, avisos y noticias del ecosistema universitario.
          </p>
        </div>

        {/* Contenedor principal con grid/flex controlado */}
        <div className="grid-novedades-premium">
          {news.map((novedad) => {
            const fechaStr = novedad.date;
            const [anio, mes, dia] = fechaStr.split("-");
            const fechaObjeto = new Date(anio, mes - 1, dia);
            
            // Nombre del mes formateado
            let nombreMes = new Intl.DateTimeFormat("es-ES", {
              month: "short",
            }).format(fechaObjeto);
            
            // Limpiamos el punto si lo trae (ej: "dic.") y ponemos mayúscula inicial
            nombreMes = nombreMes.replace(".", "");
            nombreMes = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

            return (
              <article key={novedad.id} className="tarjeta-novedad">
                {/* Bloque de Fecha Estilo Calendario Minimalista */}
                <div className="badge-calendario">
                  <span className="calendario-dia">{dia}</span>
                  <span className="calendario-mes">{nombreMes}</span>
                </div>

                {/* Contenido de la Noticia */}
                <div className="contenido-novedad">
                  <div className="meta-novedad">
                    <span className={`tag-categoria cat-${novedad.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {novedad.category}
                    </span>
                  </div>
                  <h3 className="titulo-novedad-texto">{novedad.title}</h3>
                </div>

                {/* Detalle visual: Línea decorativa de calidad */}
                <div className="decoracion-borde-tarjeta"></div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  )
}