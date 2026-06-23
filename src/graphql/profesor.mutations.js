import { gql } from "@apollo/client";

export const CREAR_VALORACION = gql`
  mutation PuntuarProfesor($profesorId: ID!, $comentario: String, $puntuacion: Int!) {
    puntuarProfesor(profesorId: $profesorId, comentario: $comentario, puntuacion: $puntuacion) {
      id
      puntuacion
      comentario
      fecha
      profesor {
        id
        nombre
        apellido
      }
    }
  }
`