import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { MATERIA_ID } from "../graphql/materia.queries";

export const useMateria = () => {
  const { id } = useParams();

  const {data: { materia = {} } = {}, loading} = useQuery(MATERIA_ID, {variables: {materiaId: id}})

  return {materia, loading}
}