import { Link } from "react-router-dom"
import { useCarrera } from "../hooks/useCarrera"

export const Carrera = () => {
  const {carrera, materias, loading} = useCarrera()

  if(loading) return (<p>cargando...</p>)

  return (
    <main>
      <h1>{carrera.nombre}</h1>
      <h2>{carrera.tituloOtorgado}</h2>
      <p>{carrera.descripcion}</p>
      <strong>{carrera.duracion} años</strong>
      <strong>{carrera.cargaHorariaTotal} hs totales</strong>
      <h3>Plan de estudios | {carrera.cantidadMaterias} materias: </h3>
      {
        materias.map((arrM, index) => {
          return (
            <div>
              <h4>{index + 1}º año</h4>
              {
                arrM.map(m => (
                  <Link 
                    to={`/materia/${m.materia.id}`} 
                    key={m.materia.id}
                  >
                    {m.materia.id} {m.materia.nombre} | {m.cuatrimestre}º Cuatrimestre
                  </Link>
                ))
              }
            </div>
          )
        })
      }
    </main>
  )
}