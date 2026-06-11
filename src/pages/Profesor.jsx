import { Rating } from "@mui/material";
import { IconBook2, IconStar } from "@tabler/icons-react";
import { useProfesor } from "../hooks/useProfesor";
import { useAuthContext } from "../hooks/useAuthContext";
import { Reseña } from "../components/Reseña";
import { MateriaBadge } from "../components/MateriaBadge";
import { BackButton } from "../components/BackButton";
import { ProfesorSkeleton } from "../skeletons/ProfesorSkeleton";

const HeaderSection = ({ profesor }) => {
  return (
    <header className="profesor-container-header section">
      <div className="container-data-header-profesor">
        <div className="profesor-header-logo">
          <b className="siglas-profe">{profesor.siglas}</b>
          <BackButton />
        </div>
        <div className="info-header-profesor">
          <div className="profesor-header-info">
            <h2 className="profesor-nombre">
              {profesor.apellido}, {profesor.nombre}
            </h2>
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
              {`${profesor?.cantidadPuntuaciones} ${profesor?.cantidadPuntuaciones === 1 ? "reseña" : "reseñas"}`}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

const MateriasSection = ({ materias }) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBook2 size={16} />
        Materias que dicta
      </h3>
      <ul className="profesor-materias-container">
        {materias.map((materia) => (
          <MateriaBadge materia={materia} key={materia.id} />
        ))}
      </ul>
    </section>
  );
};

const ValoracionesSection = ({ puntuaciones }) => {
  const { userIdentity } = useAuthContext();

  const miValoracion = userIdentity
    ? puntuaciones.find((p) => p.usuario.id === userIdentity.id)
    : null

  const otrasValoraciones = miValoracion
    ? puntuaciones.filter((p) => p.id !== miValoracion.id)
    : puntuaciones

  return (
    <section className="section">
      <h3 className="section-title">
        <IconStar size={16} />
        Valoraciones
      </h3>
      <ul className="profesor-reseñas-container">
        <MiValoracion valoracion={miValoracion}/>
        <ListarValoraciones puntuaciones={otrasValoraciones} />
      </ul>
    </section>
  )
}

const MiValoracion = ({ valoracion }) => {
  if(!valoracion) {
    return (
      <div className="mi-reseña-section">
        <p className="section-text">
          Todavía no dejaste una valoración para este profesor
        </p>
        <button className="boton-mi-reseña">+ Dejar valoración</button>
      </div>
    )
  }

  return <Reseña puntuacion={valoracion} mine/>
}

const ListarValoraciones = ({puntuaciones}) => {
  if(puntuaciones.length === 0) {
    return null
  }

  return puntuaciones.map((puntuacion) => (
    <Reseña puntuacion={puntuacion} key={puntuacion.id} />
  ))
  
}

export const Profesor = () => {
  const { profesor, loading } = useProfesor();

  if (loading) return <ProfesorSkeleton />

  return (
    <main className="page-content page-content-profesor">
      <div className="container-section">
        <HeaderSection profesor={profesor} />
        <MateriasSection materias={profesor.materias} />
        <ValoracionesSection puntuaciones={profesor.puntuaciones} />
      </div>
    </main>
  );
};
