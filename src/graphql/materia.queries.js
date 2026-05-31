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
        abreviacion
      }
    }
  }
`

export const MATERIA_ID = gql`
  query Materia($materiaId: ID!) {
    materia(id: $materiaId) {
      id
      nombre
      linkWhatsapp
      promocion
      cargaHorariaSemanal
      cargaHorariaTotal
      correlativas {
        id
        nombre
      }
      profesores {
        id
        nombre
        apellido
        siglas
        email
      }
      comisiones {
        id
        numero
        modalidad
        salon {
          tipo
          numero
        }
        anio
        cuatrimestre
        horarios {
          dia
          horaFin
          horaInicio
        }
      }
      planEstudio {
        anio
        cuatrimestre
        carrera {
          id
          nombre
        }
      }
    }
  }
`