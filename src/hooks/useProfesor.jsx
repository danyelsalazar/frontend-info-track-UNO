import { useMutation, useQuery } from "@apollo/client/react"
import { PROFESOR_ID } from "../graphql/profesor.queries"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ELIMINAR_VALORACION } from "../graphql/profesor.mutations"
import { useAuthContext } from "./useAuthContext"

export const useProfesor = () => {
  const [puntuaciones, setPuntuaciones] = useState([])

  const { id } = useParams()
  const { userIdentity } = useAuthContext()

  const { data: { profesor = {} } = {}, loading} = useQuery(PROFESOR_ID, {
    variables: { profesorId: id }
  })


  const [ eliminarValoracion, {loading: loadingEliminar} ] = useMutation(ELIMINAR_VALORACION)

  useEffect(() => {
    if (profesor?.puntuaciones) {
      setPuntuaciones(profesor.puntuaciones)
    }
  }, [profesor])

  const addValoracion = (valoracion) => {
    setPuntuaciones(p => [valoracion, ...p])
  }

  const actualizarValoracion = (valoracionActualizada) => {
    setPuntuaciones(prev => 
      prev.map(p => p.id === valoracionActualizada.id ? valoracionActualizada : p)
    )
  }

  const quitarValoracion = (valoracionId) => {
    setPuntuaciones(p => p.filter(puntuacion => puntuacion.id !== valoracionId))
  }

  const handleEliminarValoracion = async (id) => {
    await eliminarValoracion({ variables: { puntuacionId: id } })
    quitarValoracion(id)
  }

  const miValoracion = userIdentity
      ? puntuaciones.find((p) => p.usuario.id === userIdentity.id)
      : null

  return {
    profesor,
    loading,
    puntuaciones,
    addValoracion,
    actualizarValoracion,
    handleEliminarValoracion,
    loadingEliminar,
    miValoracion
  }
}