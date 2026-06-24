import { Link } from "react-router-dom"
import { IconBuilding, IconBook2 } from "@tabler/icons-react"
import { useCarrera } from "../hooks/useCarrera"
import { BackButton } from "../components/BackButton"
import { CarreraSkeleton } from "../skeletons/CarreraSkeleton"

const HeaderSection = ({ carrera }) => {
  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          <b>{carrera.nombre}</b>
          <BackButton />
        </h3>
      </div>

      <div className="materia-badge-container">
        <p className="badge">
          <IconBuilding size={14} />
          {carrera.tituloOtorgado}
        </p>

        <p className="badge">
          {carrera.duracion} años
        </p>

        <p className="badge">
          {carrera.cargaHorariaTotal} hs
        </p>
      </div>
    </header>
  )
}

const InfoSection = ({ carrera }) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBuilding size={16} />
        Información
      </h3>

      <p className="section-text">
        {carrera.descripcion || "Sin descripción disponible"}
      </p>
    </section>
  )
}

const PlanEstudiosSection = ({ materias, cantidadMaterias }) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBook2 size={16} />
        Plan de estudios ({cantidadMaterias} materias)
      </h3>

      <div className="materia-carreras-container">
        {
          materias.map((arrM, index) => (
            <div key={index} className="materia-carrera-item">
              <h4 className="materia-comisiones-title">
                {index + 1}º Año
              </h4>

              <ul className="card-materias-carrera">
                {arrM.map(m => (
                  <Link to={`/materia/${m.materia.id}`}>
                    <li key={m.materia.id} className="card">
                      <p className="materia-carrera-nombre">
                        {m.materia.id} - {m.materia.nombre}
                      </p>
                      <div className="materia-carrera-badges-container">
                        <p className="badge bage-carreras">
                          {m.cuatrimestre}º Cuatrimestre
                        </p>
                      </div>
                    </li>
                  </Link>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export const Carrera = () => {
  const { carrera, materias, loading } = useCarrera()

  return (
    <main className="page-content">
      <section className="container-section">
        {loading
          ? <CarreraSkeleton />
          : <>
              <HeaderSection carrera={carrera} />
              <main>
                <InfoSection carrera={carrera} />
                <PlanEstudiosSection
                  materias={materias}
                  cantidadMaterias={carrera.cantidadMaterias}
                />
              </main>
            </>
        }
      </section>
    </main>
  )
}