export const CalendarioSkeleton = () => {
  return (
    <div className="calendario-almanaque-vistas">
      {[1, 2, 3].map((i) => (
        <div key={i} className="hoja-almanaque skeleton-card">
          
          {/* Encabezado Gris del Mes */}
          <div className="hoja-almanaque-header skeleton-header-bg">
            <div className="anillos-decorativos">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="skeleton-line title-skele"></div>
          </div>

          {/* Cuerpo con Filas Falsas */}
          <div className="hoja-almanaque-cuerpo">
            {[1, 2].map((j) => (
              <div key={j} className="almanaque-fila-evento">
                
                {/* Bloque del Día */}
                <div className="almanaque-dia-bloque">
                  <div className="skeleton-line day-skele"></div>
                  <div className="skeleton-line sub-skele"></div>
                </div>

                <div className="almanaque-linea-vertical"></div>

                {/* Bloque del Texto */}
                <div className="almanaque-detalle-bloque">
                  <div className="skeleton-line tag-skele"></div>
                  <div className="skeleton-line desc-skele"></div>
                </div>

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};