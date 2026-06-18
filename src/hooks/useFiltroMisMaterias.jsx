import { useMemo, useState } from "react"

const ORDEN_ESTADO = { CURSANDO: 0, REGULARIZADA: 1, APROBADA: 2, PROMOCIONADA: 2 }

const comparadores = {
  actividad: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  cursada: (a, b) => {
    if (b.anio !== a.anio) return (b.anio ?? 0) - (a.anio ?? 0)
    return (b.cuatrimestre ?? 0) - (a.cuatrimestre ?? 0)
  },
  nombre: (a, b) => a.materia.nombre.localeCompare(b.materia.nombre),
  nota: (a, b) => (b.notaFinal ?? -1) - (a.notaFinal ?? -1),
  estado: (a, b) => ORDEN_ESTADO[a.estado] - ORDEN_ESTADO[b.estado],
}

export const useFiltroMisMaterias = ({materias}) => {
  const [filtroEstado, setFiltroEstado] = useState("TODAS")
  const [filtroAnio, setFiltroAnio] = useState("TODOS")
  const [filtroCuatrimestre, setFiltroCuatrimestre] = useState("TODOS")
  const [orden, setOrden] = useState("actividad")

  const materiasProcesadas = useMemo(() => {
    let resultado = materias

    if (filtroEstado !== "TODAS") {
      resultado = resultado.filter((m) => m.estado === filtroEstado)
    }

    if (filtroAnio !== "TODOS") {
      resultado = resultado.filter((m) => m.anio === Number(filtroAnio))
    }

    if (filtroCuatrimestre !== "TODOS") {
      resultado = resultado.filter((m) => m.cuatrimestre === Number(filtroCuatrimestre))
    }

    const comparador = comparadores[orden]
    if (comparador) {
      resultado = [...resultado].sort(comparador)
    }

    return resultado
  }, [materias, filtroEstado, filtroAnio, filtroCuatrimestre, orden])

  return {
    materiasProcesadas,
    filtroEstado, setFiltroEstado,
    filtroAnio, setFiltroAnio,
    filtroCuatrimestre, setFiltroCuatrimestre,
    orden, setOrden,
  }
}