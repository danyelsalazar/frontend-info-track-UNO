import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react"
import { IconAlertCircle, IconBook2, IconChartBar, IconCircleCheck, IconClipboardCheck, IconClipboardText, IconFolder, IconPhone, IconStar, } from "@tabler/icons-react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import { PROXIMOS_VENCIMIENTOS } from "../graphql/usuario.queries";
import "../styles/dashboard.css";
import { CARRERAS_NOMBRE } from "../graphql/carrera.queries";


const TOTAL_MATERIAS_CARRERA = 35;

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
            <div className="progress-row">
              <span className="progress-label">Progreso de la carrera</span>
              <span className="progress-value">
                <b>%</b> Progreso
              </span>
            </div>
            <MultiProgressBar
              data={[
                { value: 0, color: "#31bb8d" },
                { value: 0, color: "#7c3aed" },
                { value: 0, color: "#fb9609" },
                { value: 0, color: "#e5e7eb" },
              ]}
            />
          </div>

          {/* GRID STATS */}
          <div className="container-materias-grafico">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                  <IconCircleCheck color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-teal">{0}</span>
                <span className="stat-label">Aprobadas</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-cursando">
                  <IconBook2 color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-primary">{0}</span>
                <span className="stat-label">Cursando</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-cursando">
                  <IconClipboardCheck color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-primary">X</span>
                <span className="stat-label">Regularizadas</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-restantes">
                  <IconAlertCircle color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-red">{0}</span>
                <span className="stat-label">Restantes</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-promedio">
                  <IconChartBar color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-muted">{0}</span>
                <span className="stat-label">Promedio</span>
              </div>
            </div>
          </div>

          {/* SECCIÓN PROXIMOS VENCIMIENTOS */}
          {
            proximosVencimientos.length > 0 &&
            (
              <div className="tareas-section">
                <h3 className="title-tareas-user">Próximos vencimientos</h3>
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
        </div>
      </div>
    </>
  );
}