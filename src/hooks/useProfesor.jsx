import { useQuery } from "@apollo/client/react"
import { PROFESOR_ID } from "../graphql/profesor.queries"
import { useParams } from "react-router-dom"

export const useProfesor = () => {
  const { id } = useParams()
  const { data: { profesor = {} } = {}, loading} = useQuery(PROFESOR_ID, {
    variables: { profesorId: id }
  })

  return {
    profesor,
    loading
  }
}