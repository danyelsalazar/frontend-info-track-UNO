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

      const coincideAnio = filtroAnio ? p.anio === Number(filtroAnio) : true;

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
      materias.flatMap((m) => m.materia?.planEstudio?.map((p) => p.anio) || []),
    ),
  ];

  return (
    <div className="materias-user-container">
      <Header />
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
                {p.carrera.abreviacion} | {p.anio}° Año | {p.cuatrimestre}°
                cuatrimestre
              </p>
            ))}
            <div className="container-edit-materia-user">
              <button className="edit-materia-user">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#d62c5b"
                      d="M13 3a1 1 0 0 1 .117 1.993L13 5H5v14h14v-8a1 1 0 0 1 1.993-.117L21 11v8a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm6.243.343a1 1 0 0 1 1.497 1.32l-.083.095l-9.9 9.899a1 1 0 0 1-1.497-1.32l.083-.094z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        ))
      )}

      <div className="container-button-add-materia"></div>
      <button className="add-materia">Agregar materias</button>
    </div>
  );
};

export default MateriasUser;
