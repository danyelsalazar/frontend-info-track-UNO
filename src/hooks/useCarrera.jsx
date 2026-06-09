import { useQuery } from "@apollo/client/react";
import { CARRERA_ID } from "../graphql/carrera.queries";
import { useParams } from "react-router-dom";

export const useCarrera = () => {
  const { id } = useParams();
  const { data: { carrera } = {}, loading } = useQuery(CARRERA_ID, {variables: { carreraId: id }})

  return { carrera, loading }
}