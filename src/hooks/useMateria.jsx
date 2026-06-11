import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { MATERIA_ID } from "../graphql/materia.queries";

export const useMateria = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(MATERIA_ID, {
    variables: { materiaId: id },
    skip: !id, // evita ejecutar si no hay id
  });

  return {
    materia: data?.materia ?? null,
    loading,
    error,
  };
};