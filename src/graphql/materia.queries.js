import { gql } from "@apollo/client"

export const MATERIAS = gql`
  query Materias($search: String, $page: Int, $limit: Int) {
    materias(search: $search, page: $page, limit: $limit) {
      id
      nombre
      profesores {
        id
        nombre
        apellido
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
      cuatrimestreDictado
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
      comisionesActuales {
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
      comisionesAnteriores {
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