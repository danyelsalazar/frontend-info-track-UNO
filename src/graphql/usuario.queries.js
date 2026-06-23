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
`;
