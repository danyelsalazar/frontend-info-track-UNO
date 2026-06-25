import { useQuery } from "@apollo/client/react"
import { PROFESOR_ID } from "../graphql/profesor.queries"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const useProfesor = () => {
  const [puntuaciones, setPuntuaciones] = useState([])

  const { id } = useParams()
  const { data: { profesor = {} } = {}, loading} = useQuery(PROFESOR_ID, {
    variables: { profesorId: id }
  })

  useEffect(() => {
    if (profesor?.puntuaciones) {
      setPuntuaciones(profesor.puntuaciones)
    }
  }, [profesor])

  const addValoracion = (valoracion) => {
    setPuntuaciones(p => [valoracion, ...p])
  }

  const quitarValoracion = (valoracionId) => {
    setPuntuaciones(p => p.filter(puntuacion => puntuacion.id !== valoracionId))
  }

  return {
    profesor,
    loading,
    puntuaciones,
    addValoracion,
    quitarValoracion
  }
}