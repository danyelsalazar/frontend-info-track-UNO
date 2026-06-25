import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import { Rating } from "@mui/material"
import { FormModel } from "./FormModel"
import { CREAR_VALORACION } from "../graphql/profesor.mutations"

export const CrearValoracionForm = ({ profesorId, active, setActive, onCreated }) => {
  const [puntuacion, setPuntuacion] = useState(0)
  const [comentario, setComentario] = useState("")
  const [crearValoracion, {loading}] = useMutation(CREAR_VALORACION)

  const clearForm = () => {
    setPuntuacion(0)
    setComentario("")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!puntuacion) return // evitar enviar sin estrellas
    const {data: { puntuarProfesor = {} } = {}} = await crearValoracion(
      {variables: {profesorId, puntuacion, comentario}
    })
    clearForm()
    setActive(false)
    onCreated(puntuarProfesor)
  }

  return (
    <FormModel 
      title="Valorar profesor" 
      active={active} 
      setActive={setActive} 
      onSubmit={onSubmit} 
      clearForm={clearForm}
      loading={loading}
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