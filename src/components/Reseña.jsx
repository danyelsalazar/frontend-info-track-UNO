import { Rating } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export const Reseña = ({ puntuacion, mine = false, eliminarValoracion = undefined}) => {
  const fecha = new Date(Number(puntuacion.fecha));
  const fechaFormateada = fecha.toLocaleDateString("es-AR");

  return (
    <li className="reseña-card">
      <header className="reseña-header">
        <div className="container-header-name-star">
          <div className="reseña-logo">{puntuacion.usuario.siglas}</div>
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
            <p className="reseña-fecha">{fechaFormateada}</p>
          </div>
        </div>
        {mine && (
          <div className="div-btns-edit-valoration">
            <button className="btn-crud-valoration">
              <IconEdit size={16} className="icon-edit"/>
            </button>
            <button className="btn-crud-valoration" onClick={() => eliminarValoracion({ variables: { puntuacionId: puntuacion.id } })}>
              <IconTrash size={16} />
              
            </button>
          </div>
        )}
      </header>
      <main className="reseña-comentario">{puntuacion?.comentario}</main>
    </li>
  );
};
