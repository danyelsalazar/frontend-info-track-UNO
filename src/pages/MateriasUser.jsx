import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";
import { useCarreras } from "../hooks/useCarreras";
import { useMaterias } from "../hooks/useMaterias";

// componente para agregar o editar materia
const AddMateriaUser = () => {
  // estados del formulario
  const [carrera, setCarrera] = useState("");
  const [materiavalue, setMateriavalue] = useState("");
  const [estado, setEstado] = useState("");
  const [calificacion, setCalificacion] = useState("");

  // traigo las carreras
  const {
    carreras,
    loading: loadingCarrera,
    error: errorCarrera,
  } = useCarreras();

  // traigo las materias
  const {
    materias,
    loading: loadingMaterias,
    error: errorMaterias,
  } = useMaterias({ limit: 1000 });

  if (loadingCarrera || loadingMaterias) return <p>Cargando ...</p>;

  if (errorCarrera || errorMaterias)
    return <p>Error al cargar datos</p>;

  // filtramos las materias por carrera
  const materiasFiltradas = carrera
    ? materias.filter((m) =>
        m.carreras?.some((carre) => carre.id === carrera)
      )
    : [];

  // para evitar cargar el formulariuo sin que este todo ya cargado
  const isReady =
    !loadingCarrera &&
    !loadingMaterias &&
    !errorCarrera &&
    !errorMaterias;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="componet-add-materia-user">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={!isReady}>
          <select
            name="carreraUser"
            id="carreras"
            onChange={(e) => {
              setCarrera(e.target.value);
              setMateriavalue(""); // reset materia al cambiar carrera
            }}
            value={carrera}
            required
          >
            <option value="" disabled hidden>
              Seleciona una carrera
            </option>

            {/*value ahora es ID */}
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>

          <select
            name=""
            id="materias"
            value={materiavalue}
            required
            disabled={!carrera} //evita seleccionar sin carrera
            onChange={(e) => {
              setMateriavalue(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              Seleciona una materia
            </option>

            {/* USAR FILTRADAS */}
            {materiasFiltradas.map((materi) => (
              <option key={materi.id} value={materi.id}>
                {materi.nombre}
              </option>
            ))}
          </select>

          <button type="submit">Enviar</button>
        </fieldset>
      </form>
    </div>
  );
};

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

  // para el titulo
  const carreraSelect = carreras.find(
    (carrera) => carrera.id === filtroCarrera,
  );

  const materiasFiltradas = materias.filter((m) => {
    return m.materia?.planEstudio?.some((p) => {
      const coincideCarrera = filtroCarrera
        ? p.carrera.id === filtroCarrera
        : true;

      const coincideAnio = filtroAnio ? p.anio === Number(filtroAnio) : true;

      return coincideCarrera && coincideAnio;
    });
  });

  const anios = [
    ...new Set(
      materias.flatMap((m) => m.materia?.planEstudio?.map((p) => p.anio) || []),
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
        <div className="filter-materias-user">
          <div className="container-filter-materias-user">
            <select
              className="select-materia-user"
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

          <div className="container-filter-materias-user">
            <select
              className="select-materia-user"
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
          </div>

          <h2 className="title-materias-user">
            {carreraSelect ? carreraSelect.nombre : ""}
          </h2>
        </div>

        {materiasFiltradas.length === 0 ? (
          <p>No hay materias con los filtros seleccionados</p>
        ) : (
          materiasFiltradas.map((m) => (
            <div key={m.materia.id} className="materia-card card">
              <div className="title-estad-materia-user">
                <h3 className="title-materia-user-card">
                  {m.materia.nombre}
                </h3>
                <div className="container-estado-nota-materia">
                  <p className={`${estadosMateria[m.estado] || ""} estado`}>
                    {m.estado}
                  </p>
                  <p className="nota-materia">
                    Nota final:{" "}
                    <b className="number-nota">
                      {m.notaFinal}
                    </b>
                  </p>
                </div>
              </div>

              <div className="container-edit-materia-user">
                <button className="edit-materia-user">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.10-.01z" />
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
      </div>

      <button className="add-materia card">Agregar materia</button>

      <AddMateriaUser />
    </div>
  );
};

export default MateriasUser;