import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { CARRERAS_NOMBRE } from "../graphql/carrera.queries";
import { IconAntenna, IconCode, IconDatabase, IconWorldCode } from "@tabler/icons-react";

const icons = [
  <IconWorldCode />,
  <IconCode />,
  <IconAntenna />,
  <IconDatabase />
]

export const Carreras = () => {
  const { data: { carreras } = [], loading, error} = useQuery(CARRERAS_NOMBRE)

  if(loading) return (<p>Cargando...</p>)
  
  return (
    <main className="page-content">
      <section className="carreras-area">
        <div className="section-header">
          <p className="section-badge">OFERTA ACADÉMICA</p>
          <h2>Explorá las carreras disponibles</h2>
          <p className="section-sub">
            Elegí tu camino y conocé todas las materias, duración y enfoque.
          </p>
        </div>

        <div className="container-info-carreas-area">
          {carreras.map((carrera, index) => (
            <Link
              to={`/carrera/${carrera.id}`}
              className="card info-carrera-item"
              key={carrera.id}
            >
              <header>
                <p className="index-carrera">
                  {
                    icons[index]
                  }
                </p>

                <h3 className="title-carrera">{carrera.nombre}</h3>
              </header>
              
              <div>
                <p className="description-carrera">
                  {carrera.tituloOtorgado}
                </p>

                <p className="description-carrera">
                  {carrera.duracion} años ·{" "}
                  {carrera.cantidadMaterias} materias
                </p>
              </div>
              

              {/* <ul className="items-materias-por-carrera">
                {carrera.tags.map((tag, index) => (
                  <li key={index} className="materi-carrera">
                    {tag}
                  </li>
                ))}
              </ul> */}

              <span className="cta">Ver carrera →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}