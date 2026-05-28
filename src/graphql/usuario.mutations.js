import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation RegistrarUsuario($nombre: String!, $apellido: String!, $password: String!, $email: String!, $carreraId: ID!) {
    registrarUsuario(nombre: $nombre, apellido: $apellido, password: $password, email: $email, carreraId: $carreraId) {
      id
      nombre
      apellido
    }
  }
`