import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@apollo/client/react"
import { IconAlertCircle, IconBook2, IconChartBar, IconCircleCheck, IconClipboardCheck, IconClipboardText, IconFolder, IconPhone, IconStar, } from "@tabler/icons-react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import { PROXIMOS_VENCIMIENTOS } from "../graphql/usuario.queries";
import "../styles/dashboard.css";


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
  const navigate = useNavigate();
  const { token, userIdentity, loading, error } = useAuthContext();

  const {data: { proximosVencimientos } = []} = useQuery(PROXIMOS_VENCIMIENTOS)
  console.log(proximosVencimientos)

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  if (loading) return <p style={{ padding: "20px" }}>Cargando dashboard...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error: {error.message}</p>;

  // Desestructuración de datos de usuario con fallbacks de seguridad
  const { materias = [], nombre = "Estudiante", apellido = "", carreras =[] } = userIdentity || {};
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  const aprobadasYPromocionadas = materias.filter(
    (m) => m.estado === "APROBADA" || m.estado === "PROMOCIONADA"
  ).length;

  const cursando = materias.filter((m) => m.estado === "CURSANDO").length;
  const regularizadas = materias.filter((m) => m.estado === "REGULARIZADA").length;
  const restantes = Math.max(0, TOTAL_MATERIAS_CARRERA - aprobadasYPromocionadas);

  const materiasConNotaValida = materias.filter((m) => {
    let notaRaw = m.notaFinal !== undefined ? m.notaFinal : (m.materia ? m.materia.notaFinal : 0);
    const notaNumerica = parseFloat(notaRaw);
    return !isNaN(notaNumerica) && notaNumerica > 0;
  });

  const promedio = materiasConNotaValida.length > 0
    ? (materiasConNotaValida.reduce((acc, m) => {
        let notaRaw = m.notaFinal !== undefined ? m.notaFinal : (m.materia ? m.materia.notaFinal : 0);
        return acc + parseFloat(notaRaw);
      }, 0) / materiasConNotaValida.length).toFixed(2)
    : "0.00";

  const porcentajeProgreso = TOTAL_MATERIAS_CARRERA > 0 
    ? Math.round((aprobadasYPromocionadas / TOTAL_MATERIAS_CARRERA) * 100) 
    : 0;

  const pctAprobadas = TOTAL_MATERIAS_CARRERA > 0 ? (aprobadasYPromocionadas / TOTAL_MATERIAS_CARRERA) * 100 : 0;
  const pctCursando = TOTAL_MATERIAS_CARRERA > 0 ? (cursando / TOTAL_MATERIAS_CARRERA) * 100 : 0;
  const pctRegularizadas = TOTAL_MATERIAS_CARRERA > 0 ? (regularizadas / TOTAL_MATERIAS_CARRERA) * 100 : 0;
  const pctRestantes = Math.max(0, 100 - (pctAprobadas + pctCursando + pctRegularizadas));

  return (
    <>
      <Header />
      <div className="dashboard-page">
        <div className="dashboard-card">

          {/* NUEVO: BLOQUE DE BIENVENIDA Y BADGE DE CARRERA */}
          <div className="dashboard-welcome-container">
            <div className="welcome-text-block">
              <h2 className="title-bienvenida-dashboard">¡Hola, {nombreCompleto || "de nuevo"}! <IconoBienvenida/> </h2>
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
            <select>
              <option>Licenciatura</option>
            </select>
            <div className="progress-row">
              <span className="progress-label">Progreso de la carrera</span>
              <span className="progress-value">
                <b>{porcentajeProgreso}%</b> Progreso
              </span>
            </div>
            <MultiProgressBar
              data={[
                { value: pctAprobadas, color: "#31bb8d" },
                { value: pctCursando, color: "#7c3aed" },
                { value: pctRegularizadas, color: "#fb9609" },
                { value: pctRestantes, color: "#e5e7eb" },
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
                <span className="stat-value stat-teal">{aprobadasYPromocionadas}</span>
                <span className="stat-label">Aprobadas</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-cursando">
                  <IconBook2 color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-primary">{cursando}</span>
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
                <span className="stat-value stat-red">{restantes}</span>
                <span className="stat-label">Restantes</span>
              </div>

              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-promedio">
                  <IconChartBar color="#fff" size={20}/>
                </div>
                <span className="stat-value stat-muted">{promedio}</span>
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
                  <div>
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
          

          {/* SECCIÓN TAREAS */}
          
        </div>
      </div>
    </>
  );
}