import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Header from "../components/Header";
import { MiMateria } from "../components/MiMateria";
import { CrearEstadoMateriaForm } from "../components/CrearEstadoMateriaForm"

const MateriasUser = () => {
  const { userIdentity, loading, error } = useAuthContext()
  const [estadoMateriaActive, setEstadoMateriaActive] = useState(false)
  const [filtroAnio, setFiltroAnio] = useState("");

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Desestructuración segura del usuario
  const { materias = [] } = userIdentity || {};

  const materiasFiltradas = materias?.filter((m) => filtroAnio ? m.anio === Number(filtroAnio) : true)
  // Años de los estados de materia del usuario
  const anios = [...new Set(materias.map((m) => m.anio).filter(Boolean))].sort((a, b) => b - a)

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
          ? (<p>No hay materias con los filtros seleccionados</p>) 
          : (materiasFiltradas.map((m) => <MiMateria materia={m} key={m.materia.id}/>)
          )}
      </div>
      {estadoMateriaActive && (
        <CrearEstadoMateriaForm
          active={estadoMateriaActive} 
          setActive={setEstadoMateriaActive}
        />
      )}
    </div>
  );
};

export default MateriasUser;
