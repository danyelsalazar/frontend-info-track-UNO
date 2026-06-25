import { useMutation } from "@apollo/client/react"
import { useEffect, useState } from "react"
import { Rating } from "@mui/material"
import { FormModel } from "./FormModel"
import { MODIFICAR_VALORACION } from "../graphql/profesor.mutations"

export const EditarValoracionForm = ({ valoracion, onModified, active, setActive }) => {
  const [puntuacion, setPuntuacion] = useState(valoracion?.puntuacion ?? 0)
  const [comentario, setComentario] = useState(valoracion?.comentario ?? "")
  const [modificarValoracion, { loading, error }] = useMutation(MODIFICAR_VALORACION)

  useEffect(() => {
    if (valoracion) {
      setPuntuacion(valoracion.puntuacion)
      setComentario(valoracion.comentario)
    }
  }, [valoracion])

  const resetForm = () => {
    setPuntuacion(valoracion?.puntuacion ?? 0)
    setComentario(valoracion?.comentario ?? "")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!puntuacion) return
    const { data: { modificarPuntuacionProfesor: valoracionModificada = {} } = {} } = await modificarValoracion({
      variables: { puntuacionId: valoracion.id, puntuacion, comentario }
    })
    setActive(false)
    onModified(valoracionModificada)
  }

  return (
    <FormModel
      title="Modificar valoración"
      active={active}
      setActive={setActive}
      onSubmit={onSubmit}
      clearForm={resetForm}
    >
      <Rating
        size="large"
        name="puntuacion"
        value={puntuacion}
        onChange={(_, newValue) => setPuntuacion(newValue)}
      />
      <textarea
        name="comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Dejá tu comentario..."
        className="textare-valoracio-profe"
      />
    </FormModel>
  )
}