import { gql } from "@apollo/client";

export const ESTABLECER_MATERIA = gql`
  mutation Mutation($materiaId: String!, $estado: EstadoMateria!, $anio: Int, $cuatrimestre: Int, $nota: Int) {
    establecerEstadoMateria(materiaId: $materiaId, estado: $estado, anio: $anio, cuatrimestre: $cuatrimestre, nota: $nota) {
      materias {
        materia {
          id
          nombre
          planEstudio {
            anio
            cuatrimestre
            carrera{
              id
              nombre
              abreviacion
            }
          }
        }
        anio
        cuatrimestre
        estado
        notaFinal
        vencimiento {
          fecha
          anio
        }
        llamadosUsados
        updatedAt
      }
    }
  }
`

export const REMOVE_MATERIA = gql`
  mutation Mutation($materiaId: String!) {
    eliminarEstadoMateria(materiaId: $materiaId) {
      materias {
        anio
        createdAt
        cuatrimestre
        estado
        llamadosUsados
        notaFinal
        updatedAt
        materia {
          id
          nombre
        }
        vencimiento {
          fecha
          anio
        }
      }
    }
  }
`