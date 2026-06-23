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
            <a className="profesor-email" href={`mailto:${profesor.email}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                />
              </svg>
              {profesor.email}
            </a>
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
    : null;

  const otrasValoraciones = miValoracion
    ? puntuaciones.filter((p) => p.id !== miValoracion.id)
    : puntuaciones;

  return (
    <section className="section">
      <h3 className="section-title">
        <IconStar size={16} />
        Valoraciones
      </h3>
      <ul className="profesor-reseñas-container">
        <MiValoracion valoracion={miValoracion} />
        <ListarValoraciones puntuaciones={otrasValoraciones} />
      </ul>
    </section>
  );
};

const MiValoracion = ({ valoracion }) => {
  if (!valoracion) {
    return (
      <div className="mi-reseña-section">
        <p className="section-text">
          Todavía no dejaste una valoración para este profesor
        </p>
        <button className="boton-mi-reseña">+ Dejar valoración</button>
      </div>
    );
  }

  return <Reseña puntuacion={valoracion} mine />;
};

const ListarValoraciones = ({ puntuaciones }) => {
  if (puntuaciones.length === 0) {
    return null;
  }

  return puntuaciones.map((puntuacion) => (
    <Reseña puntuacion={puntuacion} key={puntuacion.id} />
  ));
};

export const Profesor = () => {
  const { profesor, loading } = useProfesor();

  if (loading) return <ProfesorSkeleton />;

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
