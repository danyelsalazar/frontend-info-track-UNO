import { Rating } from "@mui/material"
import { FormModel } from "./FormModel"
import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREAR_VALORACION } from "../graphql/profesor.mutations"

export const CrearValoracionForm = ({ profesorId, active, setActive }) => {
  const [puntuacion, setPuntuacion] = useState(0)
  const [comentario, setComentario] = useState("")
  const [crearValoracion, {loading, error}] = useMutation(CREAR_VALORACION)

  const clearForm = () => {
    setPuntuacion(0)
    setComentario("")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!puntuacion) return // evitar enviar sin estrellas
    await crearValoracion({variables: {profesorId, puntuacion, comentario}})
  }

  return (
    <FormModel 
      title="Valorar profesor" 
      active={active} 
      setActive={setActive} 
      onSubmit={onSubmit} 
      clearForm={clearForm}
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
      />
    </FormModel>
  )
}