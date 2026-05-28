import { gql } from "@apollo/client"

export const MATERIAS = gql`
  query Materias($search: String, $page: Int, $limit: Int) {
    materias(search: $search, page: $page, limit: $limit) {
      id
      nombre
      profesores {
        id
        nombre
      }
      carreras {
        id
        nombre
      }
    }
  }
`