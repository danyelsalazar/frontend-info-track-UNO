import { Link } from "react-router-dom"
import { useProfesor } from "../hooks/useProfesor"

export const Profesor = () => {
  const { profesor, loading } = useProfesor()

  if(loading) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <section className="container-section-profesor">
      <div className="container-profesor">
        <header className="profesor-container-header profesor-section">
          <div className="profesor-header-logo">
            {profesor.siglas}
          </div>
          <div className="profesor-header-info">
            <h2 className="profesor-nombre">{profesor.apellido}, {profesor.nombre}</h2>
            <p className="profesor-email">{profesor.email}</p>
          </div>
          <div className="profesor-rating-container">
            <h2 className="profesor-rating-promedio">
              4.5
            </h2>
            <div>
            </div>
            <p className="profesor-rating-cantidad">
              2 reseñas
            </p>
          </div>
        </header>
        <section className="profesor-section">
          <h3>Materias que dicta</h3>
          <ul className="profesor-materias-container">
            {
              profesor.materias.map(materia => (
                <Link to={`/materia/${materia.id}`} className="profesor-materia" key={materia.id}>
                  {materia.nombre}
                </Link>
              ))
            }
          </ul>
        </section>
        <section className="profesor-section">
          <h3>Mi reseña</h3>
          <div className="mi-reseña-section">
            <p>Todavía no dejaste una reseña para este profesor</p>
            <button className="boton-mi-reseña">
              + Dejar reseña
            </button>
          </div>
        </section>
        <section className="profesor-section">
          <h3>Reseñas</h3>
          <ul className="profesor-reseñas-container">
            <li className="profesor-reseña">
              <header className="profesor-reseña-header">
                <div className="profesor-reseña-logo">
                  AC
                </div>
                <div className="profesor-reseña-header-info">
                  <div className="profesor-reseña-header-info-content">
                    <h4 className="profesor-reseña-nombre">
                      Agustín Calpe
                    </h4>
                    <div>
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                  <p className="profesor-reseña-fecha">
                    24 de may 2026
                  </p>
                </div>
              </header>
              <main className="profesor-reseña-comentario">
                "Explica muy bien"
              </main>
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}