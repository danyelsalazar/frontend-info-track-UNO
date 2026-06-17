import { useAuthContext } from "../hooks/useAuthContext";
import { useEstadoMateriaForm } from "../hooks/useEstadoMateriaForm";
import { useMaterias } from "../hooks/useMaterias";
import { FormModel } from "./FormModel";

export const EstadoMateriaForm = ({active, setActive}) => {
  const onSuccess = () => {setActive(false)}

  const { materias } = useMaterias({ limit: 1000 })
  const { userIdentity } = useAuthContext()
  const { form, handleChange, handleEstadoChange, handleSubmit } = useEstadoMateriaForm({ onSuccess })

  const mostrarCalificacion = form.estado === "APROBADA" || form.estado === "PROMOCIONADA"
  const mostrarAnioCuatrimestre = mostrarCalificacion || form.estado === "REGULARIZADA"

  const anioActual = new Date().getFullYear();
  const anios = Array.from(
    { length: anioActual - 2015 + 1 },
    (_, i) => anioActual - i
  )

  const materiasFiltradas = materias
    .filter((m) => !userIdentity?.materias?.some((um) => um.materia?.id === m.id))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
  
  return (
    <FormModel onSubmit={handleSubmit} active={active} setActive={setActive} title="Guardar Estado de Materia">
      <select
        name="materiaId"
        value={form.materiaId}
        required
        onChange={handleChange}
      >
        <option value="" disabled hidden>Seleciona una materia</option>
        {materiasFiltradas.map((materi) => (
          <option key={materi.id} value={materi.id}>
            {materi.nombre}
          </option>
        ))}
      </select>

      <select
        name="estado"
        value={form.estado}
        onChange={handleEstadoChange}
        disabled={!form.materiaId}
        required
      >
        <option value="" disabled hidden>
          Seleciona estado
        </option>
        <option value="CURSANDO">Cursando</option>
        <option value="REGULARIZADA">Regularizada</option>
        <option value="APROBADA">Aprobada</option>
        <option value="PROMOCIONADA">Promocionada</option>
      </select>
      
      {mostrarCalificacion && (
          <select
            name="nota"
            value={form.nota}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>Calificacion</option>
            {form.estado === "APROBADA"
                ? (
                  <>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </>
                )
                : (
                  <>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </>
                )
            }
          </select>
        )
      }

      {mostrarAnioCuatrimestre && (
        <>
          <select 
            name="anio" 
            value={form.anio} 
            onChange={handleChange} 
            required={form.estado === "REGULARIZADA"}
          >
            <option value="" disabled hidden>
              Año
            </option>
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select 
            name="cuatrimestre" 
            value={form.cuatrimestre} 
            onChange={handleChange} 
            required={form.estado === "REGULARIZADA"}
          >
            <option value="" disabled hidden>
              Cuatrimestre
            </option>
            <option value={1}>1º cuatrimestre</option>
            <option value={2}>2º cuatrimestre</option>
          </select>
        </>
      )}
    </FormModel>
  )
}