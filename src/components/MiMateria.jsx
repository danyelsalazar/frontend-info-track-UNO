import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EditarEstadoMateriaForm } from "./EditarEstadoMateriaForm";
import { useMutation } from "@apollo/client/react";
import { REMOVE_MATERIA } from "../graphql/materia.mutations";
import { useAuthContext } from "../hooks/useAuthContext";

const estadosMateria = {
  APROBADA: "aprobada",
  CURSANDO: "cursando",
  REGULARIZADA: "regularizada",
  PROMOCIONADA: "promocionada",
}

export const MiMateria = ({materia}) => {
  const [editMateriaActive, setEditMateriaActive] = useState(false)
  const [removeMateria, { loading: loadingRemove }] = useMutation(REMOVE_MATERIA)
  const { setMaterias } = useAuthContext()

  const handleRemove = async () => {
    const {data} = await removeMateria({ variables: { materiaId: materia.materia.id }})
    console.log(data)
    setMaterias(data.eliminarEstadoMateria.materias)
  }

  return (
    <div className="materia-user-card">
      <header className="materia-user-card-header">
        <Link 
          className="title-materia-user-card"
          to={`/materia/${materia.materia.id}`}
        >
          {materia.materia.nombre}
        </Link>
        <div className="buttons-container-materia-user">
          <button className="materia-user-button" onClick={() => setEditMateriaActive(true)}>
            <IconEdit color="var(--color-btn)"/>
          </button>
          <button 
            className="materia-user-button"
            onClick={handleRemove}
          >
            <IconTrash color="var(--color-btn)"/>
          </button>
        </div>
      </header>

      <main className="materia-user-content">
        <p className={`${estadosMateria[materia.estado] || ""} estado`}>
            {materia.estado}
          </p>
          <p className="nota-materia">
            Cursada: <b className="number-nota">{
              materia.cuatrimestre && materia.anio
                ? `${materia.cuatrimestre}C ${materia.anio}`
                : "?"
            }</b>
          </p>

          {materia.estado === "REGULARIZADA" && (
            <>
              <p className="nota-materia">
                Vencimiento: <b className="number-nota">{`${materia.vencimiento?.fecha}º fecha ${materia.vencimiento?.anio}`}</b>
              </p>
              <p className="nota-materia">
                Llamados usados: <b className="number-nota">{`${materia.llamadosUsados}/3`}</b>
              </p>
            </> 
          )}

          {(materia.estado === "PROMOCIONADA" || materia.estado === "APROBADA") && (
            <>
              <p className="nota-materia">
                Nota: <b className="number-nota">{materia.notaFinal}</b>
              </p>
            </> 
          )}
      </main>
      {editMateriaActive && (
        <EditarEstadoMateriaForm
          active={editMateriaActive}
          setActive={setEditMateriaActive}
          materia={materia}
        />
      )}
    </div>
  )
}