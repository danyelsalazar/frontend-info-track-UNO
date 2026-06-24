import { useQuery } from "@apollo/client/react"
import { FECHAS_POR_MES } from "../graphql/fechas.queries";

const formatearMes = (mes) => {
  return mes.slice(0,3).toUpperCase()
}

const formatearDia = (fecha) => {
  return new Date(Number(fecha)).getDate()
}

export const Calendario = () => {
  const { data: { fechasImportantesPorMes: informacion} = [], loading, error} = useQuery(FECHAS_POR_MES)

  if(loading) return (<p>Cargando...</p>)

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

        <div>
          {informacion.map(info => {
            return (
              <div key={info.mes}>
                <h1>
                  - {info.mes} {info.anio}
                </h1>
                <div className="grid-novedades-premium">
                {
                  info.fechas.map(fecha => (
                    <article key={fecha.id} className="tarjeta-novedad">
                      <div className="badge-calendario">
                        <span className="calendario-dia">{formatearDia(fecha.fechaInicio)}</span>
                        {
                          fecha.fechaFin &&
                          (
                            <span className="calendario-dia">/{formatearDia(fecha.fechaFin)}</span>
                          )
                        }
                        <span className="calendario-mes">{formatearMes(info.mes)}</span>
                      </div>

                      <div className="contenido-novedad">
                        <div className="meta-novedad">
                          <span className="tag-categoria">
                            {fecha.titulo}
                          </span>
                        </div>
                        <h3 className="titulo-novedad-texto">{fecha.descripcion}</h3>
                      </div>

                      <div className="decoracion-borde-tarjeta"></div>
                    </article>
                  ))
                }
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}