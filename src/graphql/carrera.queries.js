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

export const CARRERA_ID = gql`
  query Carrera($carreraId: ID!) {
    carrera(id: $carreraId) {
      id
      nombre
      abreviacion
      tituloOtorgado
      descripcion
      duracion
      cargaHorariaTotal
      cantidadMaterias
      materias {
        anio
        materia {
          id
          nombre
        }
        cuatrimestre
      }
    }
  }
`