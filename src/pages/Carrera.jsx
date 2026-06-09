import { useCarrera } from "../hooks/useCarrera"

export const Carrera = () => {
  const {carrera, loading} = useCarrera()

  return (
    <main>
      <h1>{carrera?.nombre}</h1>
    </main>
  )
}