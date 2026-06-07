import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";

const MateriasUser = () => {
  // Obtenemos los datos del usuario desde el contexto
  const { userIdentity, loading, error } = useAuthContext();

  // Hooks siempre al inicio del componente (regla de React)
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Desestructuración segura del usuario
  const { materias = [], carreras = [] } = userIdentity || {};

  /*
    Filtrado de materias:

    Se recorre cada materia del usuario y se evalúa su array planEstudio.
    Una materia pasa el filtro si existe al menos un elemento en planEstudio
    que cumpla ambas condiciones:
    - Coincide la carrera (si hay filtro seleccionado)
    - Coincide el año (si hay filtro seleccionado)

    Se usa .some() porque planEstudio es un array.
  */
  const materiasFiltradas = materias.filter((m) => {
    return m.materia?.planEstudio?.some((p) => {
      const coincideCarrera = filtroCarrera
        ? p.carrera.id === filtroCarrera
        : true;

      const coincideAnio = filtroAnio
        ? p.anio === Number(filtroAnio)
        : true;

      return coincideCarrera && coincideAnio;
    });
  });

  /*
    Obtención de años únicos para el select:

    - flatMap permite recorrer todas las materias y aplanar los arrays de planEstudio
    - se extrae el campo anio de cada plan
    - Set elimina duplicados
  */
  const anios = [
    ...new Set(
      materias.flatMap((m) =>
        m.materia?.planEstudio?.map((p) => p.anio) || []
      )
    ),
  ];

  return (
    <div className="materias-user-container">
      <Header/>
      <h2>Mis Materias</h2>

      <div className="filter-materias-user">
        {/* Filtro por carrera */}
        <div className="container-filter-materias-user">
          <label>Filtrar por carrera:</label>
          <select
            value={filtroCarrera}
            onChange={(e) => setFiltroCarrera(e.target.value)}
          >
            <option value="">Todas las carreras</option>
            {carreras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por año */}
        <div className="container-filter-materias-user">
          <label>Filtrar por año:</label>
          <select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
          >
            <option value="">Todos los años</option>
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listado de materias filtradas */}
      {materiasFiltradas.length === 0 ? (
        <p>No hay materias con los filtros seleccionados</p>
      ) : (
        materiasFiltradas.map((m) => (
          <div key={m.materia.id} className="materia-card">
            <h3>{m.materia.nombre}</h3>
            {/* 
              Se muestran todos los planes de estudio asociados a la materia,
              ya que puede pertenecer a múltiples carreras
            */}
            {m.materia.planEstudio.map((p, index) => (
              <p key={index}>
                {p.carrera.abreviacion} | {p.anio}° Año | {p.cuatrimestre}° cuatrimestre
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MateriasUser;