import { gql } from "@apollo/client";

export const CARRERAS_NOMBRE = gql`
  query Carreras {
    carreras {
      id
      nombre
      duracion
    }
  }
`