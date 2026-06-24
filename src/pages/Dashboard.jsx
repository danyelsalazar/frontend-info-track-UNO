import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react"
import { IconAlertCircle, IconBook2, IconChartBar, IconCircleCheck, IconClipboardCheck, IconClipboardText, IconFolder, IconPhone, IconStar, } from "@tabler/icons-react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import { PROXIMO_CUATRIMESTRE, PROXIMOS_VENCIMIENTOS } from "../graphql/usuario.queries";
import "../styles/dashboard.css";
import { CARRERA_STATS, CARRERAS_NOMBRE } from "../graphql/carrera.queries";

const ACCESOS = [
  {
    label: "Mis Materias",
    icon: <IconBook2 color="#fff"/>,
    path: "/perfil/mis-materias",
  },
  {
    label: "Mis Tareas",
    icon: <IconClipboardText color="#fff"/>,
    path: "/perfil/mis-tareas",
  },
  {
    label: "Mis Valoraciones",
    icon: <IconStar color="#fff"/>,
    path: "/mi-perfil",
  },
  {
    label: "Recursos",
    icon: <IconFolder color="#fff"/>,
    path: "/recursos",
  }
];

export default function Dashboard() {
  const [carreraElegida, setCarreraElegida] = useState(null)

  const navigate = useNavigate()
  const { token, userIdentity, loading, error } = useAuthContext()

  const { data: { proximosVencimientos } = [] } = useQuery(PROXIMOS_VENCIMIENTOS)
  const { data: { carreras } = [] } = useQuery(CARRERAS_NOMBRE)
  const { data: { estadisticasPorCarrera: estadisticas } = {}, loading: loadingEstadisticas } = useQuery(CARRERA_STATS, {
    variables: {
      carreraId: carreraElegida
    }
  })
  const { data: { materiasACursarProximoCuatrimestre: MateriasProxCuatri } = [], loading: loadingProxCuatri } = useQuery(PROXIMO_CUATRIMESTRE)

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

  if (loading) return <p style={{ padding: "20px" }}>Cargando dashboard...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className="dashboard-page">
        <div className="dashboard-card">

          {/* NUEVO: BLOQUE DE BIENVENIDA Y BADGE DE CARRERA */}
          <div className="dashboard-welcome-container">
            <div className="welcome-text-block">
              <h2 className="title-bienvenida-dashboard">¡Hola, {userIdentity?.nombre + " " + userIdentity?.apellido || "de nuevo"}! <IconoBienvenida/> </h2>
              <p className="welcome-subtitle">Este es el estado actualizado de tu rendimiento académico.</p>
            </div>
          </div>

          {/* ACCESOS RÁPIDOS */}
          <div className="accesos-section">
            <div className="accesos-grid">
              {ACCESOS.map((a) => (
                <button key={a.path} className="acceso-btn" onClick={() => navigate(a.path)}>
                  <div className="container-icon-acces-sped">
                    <span className="acceso-icon">{a.icon}</span>
                  </div>
                  <span className="acceso-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN PROGRESO */}
          <div className="progress-section">
            <select onChange={(e) => setCarreraElegida(e.target.value)}>
              {
                carreras &&
                carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.nombre}
                  </option>
                ))
              }
            </select>
            {
              !loadingEstadisticas &&
              (
                <>
                  <div className="progress-row">
                    <span className="progress-label">Progreso de la carrera</span>
                    <span className="progress-value">
                      <b>{estadisticas.porcentajeCompletado}%</b> Progreso
                    </span>
                  </div>
                  <MultiProgressBar
                    data={[
                      { value: estadisticas.aprobadas + estadisticas.promocionadas, color: "#31bb8d" },
                      { value: estadisticas.regularizadas, color: "#fb9609" },
                      { value: estadisticas.cursando, color: "#7c3aed" },
                      { value: estadisticas.faltantes, color: "#e5e7eb" },
                    ]}
                  />
                </>
              )
            }
          </div>

          {/* GRID STATS */}
          <div className="container-materias-grafico">
            <div className="stats-grid">
              {
                !loadingEstadisticas &&
                (
                  <>
                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                        <IconCircleCheck color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-teal">{estadisticas.aprobadas}</span>
                      <span className="stat-label">Aprobadas</span>
                    </div>

                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                        <IconStar color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-teal">{estadisticas.promocionadas}</span>
                      <span className="stat-label">Promocionadas</span>
                    </div>

                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-cursando">
                        <IconBook2 color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-primary">{estadisticas.cursando}</span>
                      <span className="stat-label">Cursando</span>
                    </div>

                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-cursando">
                        <IconClipboardCheck color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-primary">{estadisticas.regularizadas}</span>
                      <span className="stat-label">Regularizadas</span>
                    </div>

                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-restantes">
                        <IconAlertCircle color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-red">{estadisticas.faltantes}</span>
                      <span className="stat-label">Restantes</span>
                    </div>

                    <div className="stat-card">
                      <div className="icono-info-user-materias icono-info-user-materias-promedio">
                        <IconChartBar color="#fff" size={20}/>
                      </div>
                      <span className="stat-value stat-muted">{estadisticas.promedio}</span>
                      <span className="stat-label">Promedio</span>
                    </div>
                  </>
                )
              }
            </div>
          </div>

          {/* SECCIÓN PROXIMOS VENCIMIENTOS */}
          {
            proximosVencimientos.length > 0 &&
            (
              <div className="tareas-section">
                <h3 className="title-tareas-user">Próximos Vencimientos</h3>
                <button><IconPhone />Indicar llamado</button>
                {proximosVencimientos.map(pv => (
                  <div key={pv.materia.id}>
                    <h3>{pv.materia.nombre}</h3>
                    <div>
                      <p>Llamados usados: {pv.llamadosUsados}/3</p>
                      <p>Vencimiento: {pv.vencimiento.fecha}º fecha {pv.vencimiento.anio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          }

          {/* SECCIÓN PROXIMO CUATRIMESTRE */}
          <div className="tareas-section">
            <h3 className="title-tareas-user">Próximo Cuatrimestre</h3>
            {!loadingProxCuatri &&
              MateriasProxCuatri.map(materia => (
                <Link key={materia.id} to={"/materia/" + materia.id}>
                  <h3>{materia.nombre}</h3>
                  <div>
                    <p>Correlativas: {materia.correlativas.length}/{materia.correlativas.length}</p>
                    <p>Dictado: {materia.cuatrimestreDictado.length > 1 ? "2º y 1º Cuatrimestre": `${materia.cuatrimestreDictado[0]}º Cuatrimestre`}</p>
                    <p>Carga horaria: {materia.cargaHorariaSemanal}</p>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}