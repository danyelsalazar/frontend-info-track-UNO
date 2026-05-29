import { Rating } from "@mui/material"

export const Reseña = ({puntuacion}) => {
  return (
    <li className="profesor-reseña">
      <header className="profesor-reseña-header">
        <div className="profesor-reseña-logo">
          {puntuacion.usuario.siglas}
        </div>
        <div className="profesor-reseña-header-info">
          <div className="profesor-reseña-header-info-content">
            <h4 className="profesor-reseña-nombre">
              {puntuacion.usuario.apellido}, {puntuacion.usuario.nombre}
            </h4>
            <Rating 
              readOnly 
              size="small"
              defaultValue={puntuacion.puntuacion}
            />
          </div>
          <p className="profesor-reseña-fecha">
            {puntuacion.fecha}
          </p>
        </div>
      </header>
      <main className="profesor-reseña-comentario">
        {puntuacion?.comentario}
      </main>
    </li>
  )
}