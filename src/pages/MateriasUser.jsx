import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";
import { useMaterias } from "../hooks/useMaterias";
import { FormModel } from "../components/FormModel";

const AddMateriaUser = ({active, setActive}) => {
  // estados del formulario
  const [form, setForm] = useState({
    materiaId: "",
    estado: "",
    nota: "",
    anio: "",
    cuatrimestre: "",
  });

  const anioActual = new Date().getFullYear();
  const anios = Array.from(
    { length: anioActual - 2015 + 1 },
    (_, i) => anioActual - i
  )

  const getCuatrimestreActual = () => {
    const mes = new Date().getMonth() + 1
    return mes >= 8 ? "2" : "1"
  };

  // traigo las materias
  const {materias} = useMaterias({ limit: 1000 });

  // actualiza un campo por name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // caso especial: al cambiar estado, hay que limpiar campos que ya no aplican
  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    setForm((prev) => ({
      ...prev,
      estado: nuevoEstado,
      calificacion: "",
      anio: anioActual,
      cuatrimestre: getCuatrimestreActual(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
  };

  const requiereCalificacion = form.estado === "APROBADA" || form.estado === "PROMOCIONADA"
  const requiereAnioYCuatrimestre = form.estado === "REGULARIZADA"

  return (
    <FormModel onSubmit={handleSubmit} active={active} setActive={setActive} title="Guardar Estado de Materia">
      <select
        name="materiaId"
        value={form.materiaId}
        required
        onChange={handleChange}
      >
        <option value="" disabled hidden>Seleciona una materia</option>
        {materias.map((materi) => (
          <option key={materi.id} value={materi.id}>
            {materi.nombre}
          </option>
        ))}
      </select>

      <select
        name="estado"
        value={form.estado}
        onChange={handleEstadoChange}
        disabled={!form.materiaId}
        required
      >
        <option value="" disabled hidden>
          Seleciona estado
        </option>
        <option value="CURSANDO">Cursando</option>
        <option value="REGULARIZADA">Regularizada</option>
        <option value="APROBADA">Aprobada</option>
        <option value="PROMOCIONADA">Promocionada</option>
      </select>
      
      {requiereCalificacion && (
          <select
            name="nota"
            value={form.nota}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>Calificacion</option>
            {form.estado === "APROBADA"
                ? (
                  <>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </>
                )
                : (
                  <>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </>
                )
            }
          </select>
        )
      }

      {requiereAnioYCuatrimestre && (
        <>
          <select name="anio" value={form.anio} onChange={handleChange} required>
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select name="cuatrimestre" value={form.cuatrimestre} onChange={handleChange} required>
            <option value="1">1º cuatrimestre</option>
            <option value="2">2º cuatrimestre</option>
          </select>
        </>
      )}
    </FormModel>
  );
};

const MateriasUser = () => {
  // estado para clases
  const [active, setActive] = useState(false)
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

          <button className="add-materia card" onClick={() => setActive(true)}>Agregar materia</button>

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
                <h3 className="title-materia-user-card">{m.materia.nombre}</h3>
                <div className="container-estado-nota-materia">
                  <p className={`${estadosMateria[m.estado] || ""} estado`}>
                    {m.estado}
                  </p>
                  <p className="nota-materia">
                    Nota final: <b className="number-nota">{m.notaFinal}</b>
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
      <AddMateriaUser active={active} setActive={setActive}/>
    </div>
  );
};

export default MateriasUser;
