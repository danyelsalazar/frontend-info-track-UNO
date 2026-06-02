import { Rating } from "@mui/material"
import { IconBook2, IconStar, IconUser } from "@tabler/icons-react"
import { useProfesor } from "../hooks/useProfesor"
import { Reseña } from "../components/Reseña"
import { MateriaBadge } from "../components/MateriaBadge"
import { BackButton } from "../components/BackButton"

const HeaderSection = ({profesor}) => {
  return (
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
  )
}

const MateriasSection = ({materias}) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBook2 size={16}/>
        Materias que dicta
      </h3>
      <ul className="profesor-materias-container">
        {
          materias.map(materia => <MateriaBadge materia={materia} key={materia.id}/>)
        }
      </ul>
    </section>
  )
}

const MiReseñaSection = ({puntuaciones}) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconUser size={16}/>
        Mi reseña
      </h3>
      <div className="mi-reseña-section">
        <p className="section-text">Todavía no dejaste una reseña para este profesor</p>
        <button className="boton-mi-reseña">
          + Dejar reseña
        </button>
      </div>
    </section>
  )
}

const ReseñasSection = ({puntuaciones}) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconStar size={16}/>
        Reseñas
      </h3>
      <ul className="profesor-reseñas-container">
        {
          puntuaciones.length === 0
            ? <p className="section-text">Sé el primero en dejar una reseña!</p>
            : puntuaciones.map(puntuacion => <Reseña puntuacion={puntuacion} key={puntuacion.id}/>) 
        }
      </ul>
    </section>
  )
}

export const Profesor = () => {
  const { profesor, loading } = useProfesor()

  if(loading) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <main className="page-content">
      <BackButton />
      <div className="container-section">
        <HeaderSection profesor={profesor}/>
        <MateriasSection materias={profesor.materias}/>
        <MiReseñaSection puntuaciones={profesor.puntuaciones}/>
        <ReseñasSection puntuaciones={profesor.puntuaciones}/>
      </div>
    </main>
  )
}