import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import Header from "../components/Header";
import { MiMateria } from "../components/MiMateria";
import { CrearEstadoMateriaForm } from "../components/CrearEstadoMateriaForm"
import { useFiltroMisMaterias } from "../hooks/useFiltroMisMaterias";
import { EditarEstadoMateriaForm } from "../components/EditarEstadoMateriaForm";

const MateriasUser = () => {
  const { userIdentity, loading, error } = useAuthContext()
  const [crearActive, setCrearActive] = useState(false)
  const [materiaEditando, setMateriaEditando] = useState(null)

  // Desestructuración segura del usuario
  const { materias = [] } = userIdentity || {};

  const {
    materiasProcesadas,
    aniosDisponibles,
    filtroEstado, setFiltroEstado,
    filtroAnio, setFiltroAnio,
    filtroCuatrimestre, setFiltroCuatrimestre,
    orden, setOrden,
  } = useFiltroMisMaterias({materias})

    // Manejo de estados de carga y error
  if (loading) return <p>Cargando datos del usuario...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="materias-user-container">
      <Header />
      <div className="container-sub-materias-user">
        <button className="add-materia card" onClick={() => setCrearActive(true)}>
          <IconCirclePlus size={16} />
          Agregar Materia
        </button>
        <div className="filter-materias-user">
          <div className="container-filter-materias-user">
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="TODAS">Todos los estados</option>
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
        </div>

        {materiasProcesadas.length === 0 
          ? (<p>No hay materias</p>) 
          : (materiasProcesadas.map((m) => 
            <MiMateria materia={m} key={m.materia.id} onEditar={() => setMateriaEditando(m)}/>
          )
          )}
      </div>
      <CrearEstadoMateriaForm active={crearActive} setActive={setCrearActive}/>
      {materiaEditando && (
        <EditarEstadoMateriaForm
          active={true}
          setActive={() => setMateriaEditando(null)}
          materiaUser={materiaEditando}
        />
      )}
    </div>
  );
};

export default MateriasUser;
