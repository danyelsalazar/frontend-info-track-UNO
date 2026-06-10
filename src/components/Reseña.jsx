import { Rating } from "@mui/material"

export const Reseña = ({puntuacion}) => {
  const fecha = new Date(Number(puntuacion.fecha));
  const fechaFormateada = fecha.toLocaleDateString('es-AR');
  
  return (
    <li className="reseña-card">
      <header className="reseña-header">
        <div className="reseña-logo">
          {puntuacion.usuario.siglas}
        </div>
        <div className="reseña-header-info">
          <div className="reseña-header-info-content">
            <h4 className="reseña-nombre-usuario">
              {puntuacion.usuario.apellido}, {puntuacion.usuario.nombre}
            </h4>
            <Rating 
              readOnly 
              size="small"
              defaultValue={puntuacion.puntuacion}
            />
          </div>
          <p className="reseña-fecha">
            {fechaFormateada}
          </p>
        </div>
      </header>
      <main className="reseña-comentario">
        {puntuacion?.comentario}
      </main>
    </li>
  )
}