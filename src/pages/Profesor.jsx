import { Link, useNavigate } from "react-router-dom"
import { useProfesor } from "../hooks/useProfesor"
import { Reseña } from "../components/Reseña"
import { Rating } from "@mui/material"

export const Profesor = () => {
  const { profesor, loading } = useProfesor()
  const navigate = useNavigate()

  if(loading) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <section className="container-section-profesor">
      <header className="section-header">
        <button className="btn-volver" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </header>
      <div className="container-section">
        <header className="profesor-container-header section">
          <div className="profesor-header-logo">
            {profesor.siglas}
          </div>
          <div className="profesor-header-info">
            <h2 className="profesor-nombre">{profesor.apellido}, {profesor.nombre}</h2>
            <p className="profesor-email">{profesor.email}</p>
          </div>
          <div className="profesor-rating-container">
            <h2 className="profesor-rating-promedio">
              {profesor?.promedioPuntuaciones || 0}/5
            </h2>
            <Rating 
              size="small" 
              readOnly 
              defaultValue={profesor?.promedioPuntuaciones || 0}
            />
            <p className="profesor-rating-cantidad">
              {`${profesor?.cantidadPuntuaciones} ${profesor?.cantidadPuntuaciones === 1 ? 'reseña' : 'reseñas'}`}
            </p>
          </div>
        </header>
        <section className="section">
          <h3 className="section-title">
            Materias que dicta
          </h3>
          <ul className="profesor-materias-container">
            {
              profesor.materias.map(materia => (
                <Link 
                  to={`/materia/${materia.id}`} className="materia-badge"
                  key={materia.id}
                >
                  {materia.nombre}
                </Link>
              ))
            }
          </ul>
        </section>
        <section className="section">
          <h3 className="section-title">
            Mi reseña
          </h3>
          <div className="mi-reseña-section">
            <p className="section-text">Todavía no dejaste una reseña para este profesor</p>
            <button className="boton-mi-reseña">
              + Dejar reseña
            </button>
          </div>
        </section>
        <section className="section">
          <h3 className="section-title">
            Reseñas
          </h3>
          <ul className="profesor-reseñas-container">
            {
              profesor.puntuaciones.length === 0
                ? <p>Todavía nadie dejó una reseña</p>
                : profesor.puntuaciones.map(puntuacion => (
                <Reseña puntuacion={puntuacion}/>
                )) 
            }
          </ul>
        </section>
      </div>
    </section>
  )
}