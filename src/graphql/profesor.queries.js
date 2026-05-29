import { gql } from "@apollo/client";

export const PROFESORES = gql`
  query Profesores($search: String, $limit: Int, $page: Int) {
    profesores(search: $search, limit: $limit, page: $page) {
      id
      nombre
      apellido
      email
      siglas
    }
  }
`

export const PROFESOR_ID = gql`
  query Profesor($profesorId: ID!) {
    profesor(id: $profesorId) {
      id
      nombre
      apellido
      siglas
      email
      materias {
        id
        nombre
      }
      puntuaciones {
        id
        usuario {
          id
          nombre
          apellido
        }
        puntuacion
        fecha
        comentario
      }
      cantidadPuntuaciones
      promedioPuntuaciones
    }
  }
`