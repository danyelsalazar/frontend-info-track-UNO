import { useQuery } from "@apollo/client/react";
import { MATERIAS } from "../graphql/materia.queries";
import { useDebounce } from "./useDebounce";


export const useMaterias = ({search, page, limit}) => {
  const {isDebouncing, debouncedValue} = useDebounce({value: search, delay: 300})

  const { data: {materias = []} = {}, loading} = useQuery(MATERIAS, {
    variables: {
      search: debouncedValue,
      page: page,
      limit
    }
  })

  return {
    materias,
    loading: loading || isDebouncing,
    nextPage: materias.length === limit
  }
}
