import { Link } from "react-router-dom"

export const MateriaBadge = ({materia}) => {
  return (
    <Link 
      to={`/materia/${materia.id}`} 
      className="materia-badge"
      key={materia.id}
    >
      <span className="name-correlativa-materia">{materia.nombre}</span>
    </Link>
  )
}