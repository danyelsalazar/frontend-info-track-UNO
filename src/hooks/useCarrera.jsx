import { useQuery } from "@apollo/client/react";
import { CARRERA_ID } from "../graphql/carrera.queries";
import { useParams } from "react-router-dom";

export const useCarrera = () => {
  const { id } = useParams();
  const { data: { carrera } = {}, loading } = useQuery(CARRERA_ID, {variables: { carreraId: id }})

  // Separar materias por año en un array
  const materias = []
  for(let i = 0; i < carrera?.duracion; i++) {
    materias[i] = carrera.materias.filter(m => m.anio === i+1)
  }

  return { carrera, materias, loading }
}