import { useQuery } from "@apollo/client/react"
import { PROFESORES } from "../graphql/profesor.queries"

export const useProfesores = (args) => {
  const { data: {profesores = []} = {}, loading } = useQuery(PROFESORES, {
    variables: args
  })
  return {
    profesores,
    loading,
    nextPage: profesores.length === args.limit
  }
}