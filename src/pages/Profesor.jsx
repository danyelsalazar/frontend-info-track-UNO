import { useProfesor } from "../hooks/useProfesor"

export const Profesor = () => {
  const { profesor } = useProfesor()

  return (
    <section className="container-section-materia-detalle">
      <div className="card container-materia-detalle">
        <header className="profesor-container-header">
          <div className="index-profe">
            {profesor.siglas}
          </div>
          <div>

          </div>
          <div>

          </div>
        </header>
      </div>
    </section>
  )
}