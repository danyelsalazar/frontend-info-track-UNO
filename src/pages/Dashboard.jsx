import { Link } from "react-router-dom";
import {
  IconAlertCircle,
  IconBook2,
  IconChartBar,
  IconCircleCheck,
  IconClipboardCheck,
  IconClipboardText,
  IconFolder,
  IconLogout2,
  IconPhone,
  IconStar,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons-react";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import "../styles/dashboard.css";
import { useDashboard } from "../hooks/useDashboard";

const ACCESOS = [
  {
    label: "Mis Materias",
    icon: <IconBook2 color="#fff" />,
    path: "/perfil/mis-materias",
  },
  {
    label: "Mis Tareas",
    icon: <IconClipboardText color="#fff" />,
    path: "/perfil/mis-tareas",
  },
  {
    label: "Mis Valoraciones",
    icon: <IconStar color="#fff" />,
    path: "/mi-perfil",
  },
  {
    label: "Recursos",
    icon: <IconFolder color="#fff" />,
    path: "/recursos",
  },
];

export default function Dashboard() {
  const {
    loadingUser,
    errorUser,
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
    navigate,
  } = useDashboard();

  if (loadingUser)
    return <p style={{ padding: "20px" }}>Cargando dashboard...</p>;
  if (errorUser)
    return <p style={{ padding: "20px" }}>Error: {errorUser.message}</p>;

  return (
    <>
      <Header />
      <div className="dashboard-page">
        <div className="dashboard-card">
          {/* BLOQUE DE BIENVENIDA Y ACCIÓN DE SESIÓN */}
          <div className="dashboard-welcome-container">
            <div className="welcome-text-block">
              <h2 className="title-bienvenida-dashboard">
                ¡Hola,{" "}
                {userIdentity?.nombre + " " + userIdentity?.apellido ||
                  "de nuevo"}
                ! <IconoBienvenida />
              </h2>
              <p className="welcome-subtitle">
                Este es el estado actualizado de tu rendimiento académico.
              </p>
            </div>
            <button onClick={cerrarSesion} className="btn-logout-header">
              <IconLogout2 size={18} />
              Cerrar sesión
            </button>
          </div>

          {/* ACCESOS RÁPIDOS */}
          <div className="accesos-section">
            <div className="accesos-grid">
              {ACCESOS.map((a) => (
                <button
                  key={a.path}
                  className="acceso-btn"
                  onClick={() => navigate(a.path)}
                >
                  <div className="container-icon-acces-sped">
                    <span className="acceso-icon">{a.icon}</span>
                  </div>
                  <span className="acceso-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN PROGRESO Y SELECTOR DE CARRERA INTEGRADO */}
          <div className="progress-section">
            {carreras && carreras.length > 0 && (
              <div className="selector-carrera-wrapper">
                <label className="carrera-badge-label">
                  Programa Universitario Activo
                </label>
                <select
                  defaultValue={carreras[0].id} // Asegura que de entrada tome el primer ID válido
                  onChange={(e) => {
                    if (e.target.value) {
                      setCarreraElegida(e.target.value);
                    }
                  }}
                  className="select-carrera-custom"
                >
                  {carreras.map((carrera) => (
                    <option key={carrera.id} value={carrera.id}>
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!loadingEstadisticas && estadisticas && (
              <>
                <div className="progress-row">
                  <span className="progress-label">Progreso de la carrera</span>
                  <span className="progress-value">
                    <b>{estadisticas.porcentajeCompletado}%</b> Progreso
                  </span>
                </div>
                <MultiProgressBar
                  data={[
                    {
                      value:
                        estadisticas.aprobadas + estadisticas.promocionadas,
                      color: "#31bb8d",
                    },
                    { value: estadisticas.regularizadas, color: "#fb9609" },
                    { value: estadisticas.cursando, color: "#7c3aed" },
                    { value: estadisticas.faltantes, color: "#e5e7eb" },
                  ]}
                />
              </>
            )}
          </div>

          {/* GRID STATS */}
          <div className="container-materias-grafico">
            <div className="stats-grid">
              {!loadingEstadisticas && estadisticas && (
                <>
                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                      <IconCircleCheck color="#fff" size={20} />
                    </div>
                    <span className="stat-value stat-teal">
                      {estadisticas.aprobadas}
                    </span>
                    <span className="stat-label">Aprobadas</span>
                  </div>

                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                      <IconStar color="#fff" size={20} />
                    </div>
                    <span className="stat-value stat-teal">
                      {estadisticas.promocionadas}
                    </span>
                    <span className="stat-label">Promocionadas</span>
                  </div>

                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-cursando">
                      <IconBook2 color="#fff" size={20} />
                    </div>
                    <span className="stat-value stat-primary">
                      {estadisticas.cursando}
                    </span>
                    <span className="stat-label">Cursando</span>
                  </div>

                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-regularizadas">
                      <IconClipboardCheck color="#fff" size={20} />
                    </div>
                    <span className="stat-value stat-red">
                      {estadisticas.regularizadas}
                    </span>
                    <span className="stat-label">Regularizadas</span>
                  </div>

                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-restantes">
                      <IconAlertCircle color="#fff" size={20} />
                    </div>
                    <span className="stat-value restante-label">
                      {estadisticas.faltantes}
                    </span>
                    <span className="stat-label">Restantes</span>
                  </div>

                  <div className="stat-card">
                    <div className="icono-info-user-materias icono-info-user-materias-promedio">
                      <IconChartBar color="#fff" size={20} />
                    </div>
                    <span className="stat-value stat-muted">
                      {estadisticas.promedio}
                    </span>
                    <span className="stat-label">Promedio</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CONTENEDOR DE DOS COLUMNAS EN DESKTOP PARA LA AGENDA ACADÉMICA */}
          <div className="dashboard-double-column-grid">
            {/* SECCIÓN PROXIMOS VENCIMIENTOS */}
            <div className="tareas-section">
              <div className="section-header-inline">
                <h3 className="title-tareas-user">Próximos Vencimientos</h3>
                <button className="btn-indicar-llamado">
                  <IconPhone size={16} />
                  Indicar llamado
                </button>
              </div>
              <div className="agenda-items-wrapper">
                {loadingVencimientos && (
                  <p className="loading-subtext">Cargando vencimientos...</p>
                )}
                {!loadingVencimientos &&
                  proximosVencimientos &&
                  proximosVencimientos.length > 0 &&
                  proximosVencimientos.map((pv) => (
                    <div
                      key={pv.materia.id}
                      className="tarjeta-agenda-item vencimiento-alerta"
                    >
                      <div className="agenda-icon-indicator indicator-orange">
                        <IconCalendarEvent size={18} />
                      </div>
                      <div className="agenda-content">
                        <h4>{pv.materia.nombre}</h4>
                        <div className="agenda-meta-data">
                          <span>
                            Llamados usados: <b>{pv.llamadosUsados}/3</b>
                          </span>
                          <span className="meta-divider">•</span>
                          <span>
                            Vencimiento:{" "}
                            <b>
                              {pv.vencimiento.fecha}º fecha{" "}
                              {pv.vencimiento.anio}
                            </b>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* SECCIÓN PROXIMO CUATRIMESTRE */}
            <div className="tareas-section">
              <h3 className="title-tareas-user">Próximo Cuatrimestre</h3>
              <div className="agenda-items-wrapper">
                {loadingProxCuatri && (
                  <p className="loading-subtext">Cargando materias...</p>
                )}
                {!loadingProxCuatri &&
                  materiasProxCuatri &&
                  materiasProxCuatri.map((materia) => (
                    <Link
                      key={materia.id}
                      to={"/materia/" + materia.id}
                      className="tarjeta-agenda-item link-materia-proxima"
                    >
                      <div className="agenda-icon-indicator">
                        <IconClock size={18} />
                      </div>
                      <div className="agenda-content">
                        <h4>{materia.nombre}</h4>
                        <div className="agenda-meta-data">
                          <span>
                            Correlativas:{" "}
                            <b>
                              {materia.correlativas.length}/
                              {materia.correlativas.length}
                            </b>
                          </span>
                          <span className="meta-divider">•</span>
                          <span>
                            Carga: <b>{materia.cargaHorariaSemanal}h</b>
                          </span>
                        </div>
                        <span className="badge-cuatrimestre-dictado">
                          {materia.cuatrimestreDictado.length > 1
                            ? "2º y 1º Cuatrimestre"
                            : `${materia.cuatrimestreDictado[0]}º Cuatrimestre`}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
