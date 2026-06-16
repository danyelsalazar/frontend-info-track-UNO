import { useMutation } from "@apollo/client/react";
import { useState } from "react"
import { ESTABLECER_MATERIA } from "../graphql/materia.mutations";
import { useAuthContext } from "./useAuthContext";

const initialForm = {
  materiaId: "",
  estado: "",
  nota: "",
  cuatrimestre: "",
  anio: ""
}

export const useEstadoMateriaForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialForm)
  const [establecerMateria, { loading, error }] = useMutation(ESTABLECER_MATERIA)
  const { setMaterias } = useAuthContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    // Convertir atributos a number menos el materiaId
    setForm((prev) => ({ ...prev, [name]: name === "materiaId" ? value : Number(value) }))
  }

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    setForm((prev) => ({
      ...initialForm,
      materiaId: prev.materiaId,
      estado: nuevoEstado
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sacar atributos sin valores ("")
      const variables =  Object.fromEntries(
        Object.entries(form).filter(([, value]) => value !== "")
      )
      const {data} = await establecerMateria({ variables })
      setMaterias(data.establecerEstadoMateria.materias)
      onSuccess()
    } catch (err) {
      console.error("Error al guardar materia:", err)
    }
  }

  return {
    form,
    loading,
    error,
    handleChange,
    handleEstadoChange,
    handleSubmit,
  }
}