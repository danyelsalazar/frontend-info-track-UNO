import { useQuery } from "@apollo/client/react";
import { FECHAS_POR_MES } from "../graphql/fechas.queries";
import { CalendarioSkeleton } from "../skeletons/CalendarioSkeleton";

const formatearMes = (mes) => {
  return mes.slice(0, 3).toUpperCase();
};

const formatearDia = (fecha) => {
  return new Date(Number(fecha)).getDate();
};

export const Calendario = () => {
const { data: { fechasImportantesPorMes: informacion } = {}, loading = true, error } = useQuery(FECHAS_POR_MES);
  if (error) return <p className="error-text">Error al cargar las fechas.</p>;

  const mesesInformacion = informacion || [];

  return (
    <main className="page-content container-calendario-premium">
      <section className="section-calendario-grid">
        
        {/* Header Principal */}
        <div className="section-header">
          <span className="section-badge">CRONOGRAMA</span>
          <h2>Calendario Académico</h2>
          <p className="section-sub">
            Planificá tu cuatrimestre con las fechas oficiales de exámenes, inscripciones y recesos.
          </p>
        </div>

        {/* Render condicional limpio */}
        {loading ? (
          <CalendarioSkeleton />
        ) : (
          <div className="calendario-almanaque-vistas">
            {mesesInformacion.map((info) => (
              <div key={info.mes} className="hoja-almanaque">
                
                <div className="hoja-almanaque-header">
                  <div className="anillos-decorativos">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <h3 className="hoja-mes-titulo">
                    {info.mes} <span className="hoja-anio-sub">{info.anio}</span>
                  </h3>
                </div>

                <div className="hoja-almanaque-cuerpo">
                  {info.fechas.map((fecha) => {
                    const diaInicio = formatearDia(fecha.fechaInicio);
                    const diaFin = fecha.fechaFin ? formatearDia(fecha.fechaFin) : null;

                    return (
                      <div key={fecha.id} className="almanaque-fila-evento">
                        
                        <div className="almanaque-dia-bloque">
                          <span className="num-dia-principal">{diaInicio}</span>
                          {diaFin && <span className="num-dia-rango-flecha">al {diaFin}</span>}
                          <span className="mes-abreviado-sub">{formatearMes(info.mes)}</span>
                        </div>

                        <div className="almanaque-linea-vertical"></div>

                        <div className="almanaque-detalle-bloque">
                          <span className="almanaque-evento-tag">{fecha.titulo}</span>
                          <p className="almanaque-evento-desc">{fecha.descripcion}</p>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
};