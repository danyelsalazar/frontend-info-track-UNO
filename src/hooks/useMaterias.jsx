import { useQuery } from "@apollo/client/react";
import { MATERIAS } from "../graphql/materia.queries";

export const useMaterias = ({search, page, limit}) => {
  
  const { data: {materias = []} = {}, loading} = useQuery(MATERIAS, {
    variables: {
      search,
      page: page,
      limit
    }
  })

  return {
    materias,
    loading,
    nextPage: materias.length === limit
  }
}