import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";
import { IconEdit } from "@tabler/icons-react";
import { EstadoMateriaForm } from "../components/EstadoMateriaForm";

const MateriasUser = () => {
  const [estadoMateriaActive, setEstadoMateriaActive] = useState(false)
  const { userIdentity, loading, error } = useAuthContext()
  const [filtroAnio, setFiltroAnio] = useState("");

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Desestructuración segura del usuario
  const { materias = [] } = userIdentity || {};

  const materiasFiltradas = materias?.filter((m) => filtroAnio ? m.anio === Number(filtroAnio) : true)
  // Años de los estados de materia del usuario
  const anios = [...new Set(materias.map((m) => m.anio).filter(Boolean))].sort((a, b) => b - a)

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

          <button className="add-materia card" onClick={() => setEstadoMateriaActive(true)}>Agregar materia</button>
        </div>

        {materiasFiltradas.length === 0 
          ? (
            <p>No hay materias con los filtros seleccionados</p>
          ) : 
          (materiasFiltradas.map((m) => (
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
                  <IconEdit color="var(--color-btn)"/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <EstadoMateriaForm active={estadoMateriaActive} setActive={setEstadoMateriaActive}/>
    </div>
  );
};

export default MateriasUser;
