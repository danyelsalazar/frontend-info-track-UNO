import { useEstadoMateriaForm } from "../hooks/useEstadoMateriaForm";
import { EstadoMateriaFormBase } from "./EstadoMateriaFormBase";

export const EditarEstadoMateriaForm = ({ active, setActive, materia }) => {
  const onSuccess = () => setActive(false)

  const initialForm = {
    materiaId: materia.materia.id,
    estado: materia.estado,
    nota: materia.notaFinal || "",
    cuatrimestre: materia.cuatrimestre || "",
    anio: materia.anio || ""
  }

  const { form, handleChange, handleEstadoChange, handleSubmit } = useEstadoMateriaForm({ onSuccess, initialForm })

  return (
    <EstadoMateriaFormBase
      active={active}
      setActive={setActive}
      title={`Editar: ${materia.materia.nombre}`}
      form={form}
      handleChange={handleChange}
      handleEstadoChange={handleEstadoChange}
      handleSubmit={handleSubmit}
      materiaSelectSlot={
        <input type="text" value={materia.materia.nombre} disabled />
      }
    />
  )
}