import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import { MiMateria } from "../components/MiMateria";
import { CrearEstadoMateriaForm } from "../components/CrearEstadoMateriaForm"
import { useFiltroMisMaterias } from "../hooks/useFiltroMisMaterias";

const MateriasUser = () => {
  const { userIdentity, loading, error } = useAuthContext()
  const [estadoMateriaActive, setEstadoMateriaActive] = useState(false)

  // Desestructuración segura del usuario
  const { materias = [] } = userIdentity || {};

  const {
    materiasProcesadas,
    filtroEstado, setFiltroEstado,
    filtroAnio, setFiltroAnio,
    filtroCuatrimestre, setFiltroCuatrimestre,
    orden, setOrden,
  } = useFiltroMisMaterias({materias})

  // Años de los estados de materia del usuario
  const aniosDisponibles = useMemo(() => {
    const set = new Set(materias.map((m) => m.anio).filter(Boolean))
    return [...set].sort((a, b) => b - a)
  }, [materias])

    // Manejo de estados de carga y error
  if (loading) return <p>Cargando datos del usuario...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="materias-user-container">
      <Header />
      <div className="container-sub-materias-user">
        <div className="filter-materias-user">
          <div className="container-filter-materias-user">
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="TODAS">Todas</option>
              <option value="CURSANDO">Cursando</option>
              <option value="REGULARIZADA">Regularizada</option>
              <option value="APROBADA">Aprobada</option>
              <option value="PROMOCIONADA">Promocionada</option>
            </select>

            <select value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)}>
              <option value="TODOS">Todos los años</option>
              {aniosDisponibles.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            <select value={filtroCuatrimestre} onChange={(e) => setFiltroCuatrimestre(e.target.value)}>
              <option value="TODOS">Todos los cuatrimestres</option>
              <option value="1">1º cuatrimestre</option>
              <option value="2">2º cuatrimestre</option>
            </select>

            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="actividad">Más recientes</option>
              <option value="cursada">Cursada</option>
              <option value="nombre">Alfabético</option>
              <option value="nota">Nota</option>
              <option value="estado">Estado</option>
            </select>
          </div>

          <button className="add-materia card" onClick={() => setEstadoMateriaActive(true)}>Agregar materia</button>
        </div>

        {materiasProcesadas.length === 0 
          ? (<p>No hay materias</p>) 
          : (materiasProcesadas.map((m) => <MiMateria materia={m} key={m.materia.id}/>)
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
