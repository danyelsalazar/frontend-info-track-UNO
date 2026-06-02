import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      nombre
      apellido
      siglas
      anioIngreso
      promedioGeneral
      carreras {
        id
        nombre
      }
      materias {
        materia {
          id
          nombre
        }
        anio
        cuatrimestre
        estado
        notaFinal
        llamadosUsados
        vencimiento
      }
      puntuaciones {
        puntuacion
        fecha
        comentario
        profesor {
          id
          nombre
        }
      }
    }
  }
`