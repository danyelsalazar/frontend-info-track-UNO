import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  PROXIMO_CUATRIMESTRE,
  PROXIMOS_VENCIMIENTOS,
} from "../graphql/usuario.queries";
import { CARRERA_STATS, CARRERAS_NOMBRE } from "../graphql/carrera.queries";

export const useDashboard = () => {
  const [carreraElegida, setCarreraElegida] = useState(null);

  const navigate = useNavigate();
  const {
    token,
    userIdentity,
    loading,
    error,
    clearUserIdentity,
    eliminarToken,
  } = useAuthContext();

  // 1. Query de Vencimientos (Sin desestructurar fuerte de entrada)
  const responseVencimientos = useQuery(PROXIMOS_VENCIMIENTOS);
  const proximosVencimientos =
    responseVencimientos.data?.proximosVencimientos || [];
  const loadingVencimientos = responseVencimientos.loading;

  // 2. Query de Carreras
  const responseCarreras = useQuery(CARRERAS_NOMBRE);
  const carreras = responseCarreras.data?.carreras || [];

  // 3. Query de Estadísticas con SKIP protegido
  const responseStats = useQuery(CARRERA_STATS, {
    variables: { carreraId: carreraElegida },
    skip: !carreraElegida, // Frena el envío si es null
  });
  const estadisticas = responseStats.data?.estadisticasPorCarrera || null;
  const loadingEstadisticas = responseStats.loading;

  // 4. Query de Próximo Cuatrimestre
  const responseProxCuatri = useQuery(PROXIMO_CUATRIMESTRE);
  const materiasProxCuatri =
    responseProxCuatri.data?.materiasACursarProximoCuatrimestre || [];
  const loadingProxCuatri = responseProxCuatri.loading;

  // Asigna la primera carrera activa apenas se cargue la lista
  useEffect(() => {
    if (carreras.length > 0 && !carreraElegida) {
      setCarreraElegida(carreras[0].id);
    }
  }, [carreras, carreraElegida]);

  // Redirección por falta de sesión
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const cerrarSesion = () => {
    navigate("/");
    eliminarToken();
    clearUserIdentity();
  };

  return {
    loadingUser: loading,
    errorUser: error,
    setCarreraElegida,
    carreras,
    userIdentity,
    proximosVencimientos,
    loadingVencimientos,
    estadisticas,
    loadingEstadisticas: loadingEstadisticas || !carreraElegida, // Muestra cargando si no hay ID
    materiasProxCuatri,
    loadingProxCuatri,
    cerrarSesion,
    navigate,
  };
};
