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