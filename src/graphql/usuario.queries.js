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
        estado
        notaFinal
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
`;

export const PROXIMOS_VENCIMIENTOS = gql`
  query ProximosVencimientos {
    proximosVencimientos {
      materia {
        id
        nombre
      }
      llamadosUsados
      vencimiento {
        anio
        fecha
      }
    }
  }
`