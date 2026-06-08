import { useQuery } from "@apollo/client/react";
import { MATERIAS } from "../graphql/materia.queries";

export const useMaterias = (params = {}) => {
  const { search = "", page = 1, limit = 10 } = params;

  const { data, loading, error } = useQuery(MATERIAS, {
    variables: {
      search,
      page,
      limit,
    },
  });

  const materias = data?.materias ?? [];

  return {
    materias,
    loading,
    error,
    nextPage: materias.length === limit,
  };
};