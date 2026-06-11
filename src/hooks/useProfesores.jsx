import { useQuery } from "@apollo/client/react"
import { PROFESORES } from "../graphql/profesor.queries"
import { useDebounce } from "./useDebounce"

export const useProfesores = ({search, limit, page}) => {
  const {isDebouncing, debouncedValue} = useDebounce({value: search, delay: 300})

  const { data: {profesores = []} = {}, loading } = useQuery(PROFESORES, {
    variables: { 
      search: debouncedValue,
      limit,
      page
    }
  })
  return {
    profesores,
    loading: isDebouncing || loading,
    nextPage: profesores.length === limit
  }
}