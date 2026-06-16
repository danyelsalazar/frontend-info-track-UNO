import { IconEdit, IconTrash } from "@tabler/icons-react";

const estadosMateria = {
  APROBADA: "aprobada",
  CURSANDO: "cursando",
  REGULARIZADA: "regularizada",
  PROMOCIONADA: "promocionada",
}

export const MiMateria = ({materia}) => {
  return (
    <div className="materia-user-card card">
      <header className="materia-user-card-header">
        <h3 className="title-materia-user-card">{materia.materia.nombre}</h3>
        <div className="buttons-container-materia-user">
          <button className="materia-user-button">
            <IconEdit color="var(--color-btn)"/>
          </button>
          <button className="materia-user-button">
            <IconTrash color="var(--color-btn)"/>
          </button>
        </div>
      </header>

      <main className="materia-user-content">
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
      </main>

    </div>
  )
}