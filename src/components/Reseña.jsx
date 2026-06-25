import { Rating } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { BotonLoading } from "./BotonLoading";

export const Reseña = ({ loadingEliminar, puntuacion, showModificarForm, eliminarValoracion = undefined, mine = false}) => {
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
                value={puntuacion.puntuacion}
              />
            </div>
            <p className="reseña-fecha">{fechaFormateada}</p>
          </div>
        </div>
        {mine && (
          <div className="div-btns-edit-valoration">
            <button 
              className="btn-crud-valoration" 
              onClick={showModificarForm}
              disabled={loadingEliminar}
            >
              <IconEdit size={16} className="icon-edit"/>
            </button>
            <BotonLoading 
              className="btn-crud-valoration" 
              loading={loadingEliminar} 
              onClick={() => eliminarValoracion(puntuacion.id)}
            >
              {!loadingEliminar && <IconTrash size={16} />}
            </BotonLoading>
          </div>
        )}
      </header>
      <main className="reseña-comentario">{puntuacion?.comentario}</main>
    </li>
  );
};
