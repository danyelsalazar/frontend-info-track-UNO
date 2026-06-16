import { IconEdit, IconTrash } from "@tabler/icons-react";

const estadosMateria = {
  APROBADA: "aprobada",
  CURSANDO: "cursando",
  REGULARIZADA: "regularizada",
  PROMOCIONADA: "promocionada",
}

export const MiMateria = ({materia}) => {
  console.log(materia)
  return (
    <div className="materia-card card">
      <header>
        <h3 className="title-materia-user-card">{materia.materia.nombre}</h3>
        <div className="container-edit-materia-user">
          <button className="edit-materia-user">
            <IconEdit color="var(--color-btn)"/>
          </button>
          <button className="edit-materia-user">
            <IconTrash color="var(--color-btn)"/>
          </button>
        </div>
      </header>

      <main className="title-estado-materia-user">
        <div className="container-estado-nota-materia">
          <p className={`${estadosMateria[materia.estado] || ""} estado`}>
            {materia.estado}
          </p>
          <p className="nota-materia">
            Año: <b className="number-nota">{materia.anio || "?"}</b>
          </p>
          <p className="nota-materia">
            Cuatrimestre: <b className="number-nota">{materia.cuatrimestre || "?"}</b>
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
        </div>
      </main>

    </div>
  )
}