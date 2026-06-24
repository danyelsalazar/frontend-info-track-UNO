import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react"
import { useAuthContext } from "../hooks/useAuthContext";
import { PROXIMO_CUATRIMESTRE, PROXIMOS_VENCIMIENTOS } from "../graphql/usuario.queries";
import { CARRERA_STATS, CARRERAS_NOMBRE } from "../graphql/carrera.queries";

export const useDashboard = () => {
  const [carreraElegida, setCarreraElegida] = useState(null)

  const navigate = useNavigate()
  const { token, userIdentity, loading, error, clearUserIdentity, eliminarToken } = useAuthContext()

  const { data: { proximosVencimientos } = [], loading: loadingVencimientos } = useQuery(PROXIMOS_VENCIMIENTOS)
  const { data: { carreras } = [] } = useQuery(CARRERAS_NOMBRE)
  const { data: { estadisticasPorCarrera: estadisticas } = {}, loading: loadingEstadisticas } = useQuery(CARRERA_STATS, {
    variables: {
      carreraId: carreraElegida
    }
  })
  const { data: { materiasACursarProximoCuatrimestre: materiasProxCuatri } = [], loading: loadingProxCuatri } = useQuery(PROXIMO_CUATRIMESTRE)

  useEffect(() => {
    if(carreras) {
      setCarreraElegida(carreras[0].id)
    }
  }, [carreras])

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const cerrarSesion = () => {
    navigate("/")
    eliminarToken()
    clearUserIdentity()
  }

  return {
    loadingUser: loading,
    errorUser: error,
    setCarreraElegida,
    carreras,
    userIdentity,
    proximosVencimientos,
    loadingVencimientos,
    estadisticas,
    loadingEstadisticas,
    materiasProxCuatri,
    loadingProxCuatri,
    cerrarSesion,
    navigate
  }
}