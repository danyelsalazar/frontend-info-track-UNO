import { useAuthContext } from "../hooks/useAuthContext";
import { useEstadoMateriaForm } from "../hooks/useEstadoMateriaForm";
import { useMaterias } from "../hooks/useMaterias";
import { EstadoMateriaFormBase } from "./EstadoMateriaFormBase";

export const CrearEstadoMateriaForm = ({ active, setActive }) => {
  const onSuccess = () => setActive(false)

  const { materias } = useMaterias({ limit: 1000 })
  const { userIdentity } = useAuthContext()
  const { form, handleChange, handleEstadoChange, handleSubmit } = useEstadoMateriaForm({ onSuccess })

  // Mostrar materias que no tengan estado y en orden alfabetico
  const materiasFiltradas = materias
    .filter((m) => !userIdentity?.materias?.some((um) => um.materia?.id === m.id))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <EstadoMateriaFormBase
      active={active}
      setActive={setActive}
      title="Guardar Estado de Materia"
      form={form}
      handleChange={handleChange}
      handleEstadoChange={handleEstadoChange}
      handleSubmit={handleSubmit}
      materiaSelectSlot={
        <select name="materiaId" value={form.materiaId} required onChange={handleChange}>
          <option value="" disabled hidden>Seleciona una materia</option>
          {materiasFiltradas.map((materi) => (
            <option key={materi.id} value={materi.id}>{materi.nombre}</option>
          ))}
        </select>
      }
    />
  )
}