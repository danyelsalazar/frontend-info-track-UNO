import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";
import { useCarreras } from "../hooks/useCarreras";
import { useMaterias } from "../hooks/useMaterias";

// ==========================
// FORMULARIO AGREGAR MATERIA
// ==========================
const AddMateriaUser = () => {
  // Estados del formulario
  const [carrera, setCarrera] = useState(""); // ahora guarda ID
  const [materiaValue, setMateriaValue] = useState("");

  // Traigo carreras
  const {
    carreras,
    loading: loadingCarrera,
    error: errorCarrera,
  } = useCarreras();

  // Traigo materias
  const {
    materias,
    loading: loadingMaterias,
    error: errorMaterias,
  } = useMaterias({ limit: 1000 }); // traemos muchas para el select asi no tomo el limit que se definio en el useMaterias de 10

  // Loading global
  if (loadingCarrera || loadingMaterias) return <p>Cargando ...</p>;

  // Error global
  if (errorCarrera || errorMaterias)
    return <p>Error al cargar datos</p>;

  // ==========================
  // FILTRADO POR CARRERA (CORRECTO)
  // ==========================
  const materiasFiltradas = carrera
    ? materias.filter((m) =>
        m.carreras?.some((c) => c.id === carrera)
      )
    : [];

  // ==========================
  // CONTROL GENERAL DEL FORM
  // ==========================
  const isReady =
    !loadingCarrera &&
    !loadingMaterias &&
    !errorCarrera &&
    !errorMaterias;

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log({
    //   carrera,
    //   materiaValue,
    // });
  };

  return (
    <div className="componet-add-materia-user">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={!isReady}>
          {/* SELECT CARRERA */}
          <label htmlFor="carreras">Selecciona la carrera</label>
          <select
            id="carreras"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Selecciona una carrera
            </option>

            {carreras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          {/* SELECT MATERIAS DEPENDIENTE */}
          <label htmlFor="materias">Selecciona una materia</label>
          <select
            id="materias"
            value={materiaValue}
            onChange={(e) => setMateriaValue(e.target.value)}
            disabled={!carrera} // 👈 clave
            required
          >
            <option value="" disabled hidden>
              Selecciona una materia
            </option>

            {materiasFiltradas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>

          <button type="submit" disabled={!materiaValue}>
            Enviar
          </button>
        </fieldset>
      </form>
    </div>
  );
};

// ==========================
// COMPONENTE PRINCIPAL
// ==========================
const MateriasUser = () => {
  const { userIdentity, loading, error } = useAuthContext();

  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { materias = [], carreras = [] } = userIdentity || {};

  const carreraSelect = carreras.find(
    (c) => c.id === filtroCarrera
  );

  // ==========================
  // FILTRADO DE MATERIAS DEL USUARIO
  // ==========================
  const materiasFiltradas = materias.filter((m) =>
    m.materia?.planEstudio?.some((p) => {
      const coincideCarrera = filtroCarrera
        ? p.carrera.id === filtroCarrera
        : true;

      const coincideAnio = filtroAnio
        ? p.anio === Number(filtroAnio)
        : true;

      return coincideCarrera && coincideAnio;
    })
  );

  // ==========================
  // AÑOS DISPONIBLES
  // ==========================
  const anios = [
    ...new Set(
      materias.flatMap(
        (m) =>
          m.materia?.planEstudio?.map((p) => p.anio) || []
      )
    ),
  ];

  const estadosMateria = {
    APROBADA: "aprobada",
    CURSANDO: "cursando",
    REGULARIZADA: "regularizada",
    PROMOCIONADA: "promocionada",
  };

  return (
    <div className="materias-user-container">
      <Header />

      <div className="container-sub-materias-user">
        {/* FILTROS */}
        <div className="filter-materias-user">
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

          <select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
          >
            <option value="">Todos los años</option>
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}° año
              </option>
            ))}
          </select>

          <h2>
            {carreraSelect ? carreraSelect.nombre : ""}
          </h2>
        </div>

        {/* LISTADO */}
        {materiasFiltradas.length === 0 ? (
          <p>No hay materias con los filtros seleccionados</p>
        ) : (
          materiasFiltradas.map((m) => (
            <div key={m.materia.id} className="materia-card card">
              <h3>{m.materia.nombre}</h3>

              <p className={`estado ${estadosMateria[m.estado]}`}>
                {m.estado}
              </p>

              <p>
                Nota: <b>{m.notaFinal ?? "-"}</b>
              </p>
            </div>
          ))
        )}
      </div>

      <AddMateriaUser />
    </div>
  );
};

export default MateriasUser;