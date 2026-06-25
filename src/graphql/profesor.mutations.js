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
      usuario {
        id
        nombre
        apellido
        siglas
      }
    }
  }
`

export const ELIMINAR_VALORACION = gql`
  mutation EliminarPuntuacion($puntuacionId: ID!) {
    eliminarPuntuacion(puntuacionId: $puntuacionId) {
      id
    }
  }
`

export const MODIFICAR_VALORACION = gql`
  mutation ModificarPuntuacionProfesor($puntuacionId: ID!, $puntuacion: Int, $comentario: String) {
    modificarPuntuacionProfesor(puntuacionId: $puntuacionId, puntuacion: $puntuacion, comentario: $comentario) {
      id
      puntuacion
      usuario {
        id
        nombre
        apellido
        siglas
      }
      fecha
      comentario
    }
  }
`