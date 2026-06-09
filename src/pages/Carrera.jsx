import { useQuery } from "@apollo/client/react";
import { CARRERA_ID } from "../graphql/carrera.queries";
import { useParams } from "react-router-dom";

export const Carrera = () => {
  const { id } = useParams();
  const { data: { carrera } = {}, loading } = useQuery(CARRERA_ID, {variables: { carreraId: id }})

  return (
    <main>
      <h1>{carrera?.nombre}</h1>
    </main>
  )
}