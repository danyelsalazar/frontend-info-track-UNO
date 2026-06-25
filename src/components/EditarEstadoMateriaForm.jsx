import { useEstadoMateriaForm } from "../hooks/useEstadoMateriaForm";
import { EstadoMateriaFormBase } from "./EstadoMateriaFormBase";

export const EditarEstadoMateriaForm = ({ active, setActive, materiaUser }) => {    
  const onSuccess = () => setActive(false)
  const { materia } = materiaUser

  const initialForm = {
    materiaId: materia.id,
    estado: materiaUser?.estado || "",
    nota: materiaUser?.notaFinal || "",
    cuatrimestre: materiaUser?.cuatrimestre || "",
    anio: materiaUser?.anio || ""
  }
  const { form, handleChange, handleEstadoChange, handleSubmit, clearForm, loading } = useEstadoMateriaForm({ onSuccess, initialForm })
  
  return (
    <EstadoMateriaFormBase
      active={active}
      setActive={setActive}
      title={`${materiaUser.estado ? "Editar: " : ""}${materia.nombre}`}
      form={form}
      handleChange={handleChange}
      handleEstadoChange={handleEstadoChange}
      handleSubmit={handleSubmit}
      clearForm={clearForm}
      materiaSelectSlot={""}
      loading={loading}
    />
  )
}