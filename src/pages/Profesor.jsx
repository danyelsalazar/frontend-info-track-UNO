import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { IconBook2, IconMail, IconStar } from "@tabler/icons-react";
import { useProfesor } from "../hooks/useProfesor";
import { useAuthContext } from "../hooks/useAuthContext";
import { Reseña } from "../components/Reseña";
import { MateriaBadge } from "../components/MateriaBadge";
import { BackButton } from "../components/BackButton";
import { CrearValoracionForm } from "../components/CrearValoracionForm";
import { EditarValoracionForm } from "../components/EditarValoracionForm";
import { ProfesorSkeleton } from "../skeletons/ProfesorSkeleton";

const HeaderSection = ({ profesor, puntuaciones }) => {
  const cantidad = puntuaciones.length
  const promedio = cantidad 
    ? puntuaciones.reduce((acc, p) => acc + p.puntuacion, 0) / cantidad
    : 0
  const promedioRedondeado = Math.round(promedio * 10) / 10

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
              <IconMail size={16}/>
              {profesor.email}
            </a>
          </div>
          <div className="profesor-rating-container">
            <h2 className="profesor-rating-promedio">
              {promedioRedondeado}/5
            </h2>
            <Rating
              size="small"
              readOnly
              value={promedioRedondeado}
            />
            <p className="profesor-rating-cantidad">
              {`${cantidad} ${cantidad === 1 ? "reseña" : "reseñas"}`}
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

const ValoracionesSection = ({ puntuaciones, miValoracion, showForm, showModificarForm, eliminarValoracion, loadingEliminar }) => {
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
        <MiValoracion 
          valoracion={miValoracion} 
          showForm={showForm} 
          showModificarForm={showModificarForm} 
          eliminarValoracion={eliminarValoracion}
          loadingEliminar={loadingEliminar}
        />
        <ListarValoraciones puntuaciones={otrasValoraciones} />
      </ul>
    </section>
  );
};

const MiValoracion = ({ valoracion, showForm, showModificarForm, eliminarValoracion, loadingEliminar }) => {
  const { userIdentity } = useAuthContext()
  const navigate = useNavigate()
  if (!valoracion) {
    return (
      <div className="mi-reseña-section">
        <p className="section-text">
          Todavía no dejaste una valoración para este profesor
        </p>
        <button className="boton-mi-reseña" onClick={() => {
          if(!userIdentity) {
            navigate("/login")
            return
          }
          showForm()
        }}>
          + Dejar valoración
        </button>
      </div>
    );
  }

  return (
    <Reseña 
      puntuacion={valoracion} 
      eliminarValoracion={eliminarValoracion}
      showModificarForm={showModificarForm}
      loadingEliminar={loadingEliminar}
      mine
    />
  )
};

const ListarValoraciones = ({ puntuaciones }) => {
  if (puntuaciones.length === 0) {
    return null;
  }

  return puntuaciones.map((puntuacion) => (
    <Reseña puntuacion={puntuacion} key={puntuacion.id}/>
  ));
};

export const Profesor = () => {
  const [formActive, setFormActive] = useState(false)
  const [formModificarActive, setFormModificarActive] = useState(false)
  const { 
    profesor, 
    loading, 
    puntuaciones, 
    addValoracion, 
    handleEliminarValoracion, 
    actualizarValoracion, 
    loadingEliminar, 
    miValoracion 
  } = useProfesor()

  if (loading) return <ProfesorSkeleton />;

  return (
    <main className="page-content page-content-profesor">
      <div className="container-section">
        <HeaderSection profesor={profesor} puntuaciones={puntuaciones} />
        <MateriasSection materias={profesor.materias} />
        <ValoracionesSection 
          puntuaciones={puntuaciones}
          miValoracion={miValoracion}
          showForm={() => setFormActive(true)} 
          showModificarForm={() => setFormModificarActive(true)}
          eliminarValoracion={handleEliminarValoracion}
          loadingEliminar={loadingEliminar}
        />
      </div>
      <CrearValoracionForm 
        active={formActive} 
        setActive={setFormActive} 
        profesorId={profesor.id}
        onCreated={addValoracion}
      />
      <EditarValoracionForm 
        active={formModificarActive}
        setActive={setFormModificarActive}
        valoracion={miValoracion}
        onModified={actualizarValoracion}
      />
    </main>
  );
};
