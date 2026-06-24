import { gql } from "@apollo/client";

export const FECHAS_POR_MES = gql`
  query FechasImportantesPorMes {
    fechasImportantesPorMes {
      mes
      anio
      fechas {
        id
        titulo
        fechaInicio
        fechaFin
        descripcion
      }
    }
  }
` 