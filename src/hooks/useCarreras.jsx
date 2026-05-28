import { useQuery } from "@apollo/client/react"
import { CARRERAS_NOMBRE } from "../graphql/carrera.queries"

export const useCarreras = () => {
  const {data, loading, error } = useQuery(CARRERAS_NOMBRE)
  return {
    carreras: data?.carreras || [],
    loading,
    error
  }
}