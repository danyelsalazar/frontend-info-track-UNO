import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import { IconAlertCircle, IconBook2, IconChartBar, IconCircleCheck, IconClipboardCheck, IconClipboardText, IconFolder, IconStar, } from "@tabler/icons-react";

const TOTAL_MATERIAS_CARRERA = 35;

const TAREAS_INICIALES = [
  {
    title: "Parcial de Bases de Datos",
    dia: "Hoy",
    tipo: "Final",
    horario: "09:00",
    badgeClass: "badge-red",
    completada: false,
  },
  {
    title: "TP Algoritmos — entrega",
    dia: "Jue 17",
    tipo: "Tarea",
    horario: "09:00",
    badgeClass: "badge-yellow",
    completada: false,
  },
  {
    title: "Parcial de Redes II",
    dia: "Vie 18",
    tipo: "Parcial",
    horario: "09:00",
    badgeClass: "badge-blue",
    completada: false,
  },
];

const ACCESOS = [
  {
    label: "Mis Materias",
    icon: <IconBook2 color="#fff"/>,
    path: "/mis-materias",
  },
  {
    label: "Mis Tareas",
    icon: <IconClipboardText color="#fff"/>,
    path: "/plan-estudio",
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
  
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoHorario, setNuevoHorario] = useState("");
  const [nuevoDia, setNuevoDia] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("Tarea");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleClickTask = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  const handleAgregarTarea = (e) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevoHorario || !nuevoDia) return;

    let badgeClass = "badge-blue";
    if (nuevoTipo === "Final") badgeClass = "badge-red";
    if (nuevoTipo === "Tarea") badgeClass = "badge-yellow";

    const nuevaTarea = {
      title: nuevoTitulo,
      horario: nuevoHorario,
      dia: nuevoDia,
      tipo: nuevoTipo,
      badgeClass: badgeClass,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);
    
    setNuevoTitulo("");
    setNuevoHorario("");
    setNuevoDia("");
    setNuevoTipo("Tarea");
    setMostrarFormulario(false);
  };

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

          {/* SECCIÓN TAREAS */}
          <div className="tareas-section">
            <h3 className="title-tareas-user">Tareas</h3>
            <ul className="tareas-list">
              {tareas.map((t, i) => (
                <li key={i} className="tarea-item" style={{ opacity: t.completada ? 0.5 : 1 }}>
                  <div className="horario-task">
                    {t.horario}
                    <span className="tarea-dia">{t.dia}</span>
                  </div>
                  <div className="divisor-horario-info"></div>
                  <div className="tarea-item-description">
                    <div className="task-description-sub">
                      <span className="tarea-title" style={{ textDecoration: t.completada ? "line-through" : "none" }}>
                        {t.title}
                      </span>
                      <span className={`tarea-badge ${t.badgeClass}`}>{t.tipo}</span>
                    </div>
                    <div className="task-day" onClick={() => handleClickTask(i)}>
                      {t.completada ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                          <path fill="#31bb8d" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                          <path fill="#009cd1" d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </li>
              ))}

              {/* FORMULARIO INLINE DINÁMICO */}
              {mostrarFormulario && (
                <form onSubmit={handleAgregarTarea} className="tarea-item" style={{ gridTemplateColumns: "1fr", gap: "10px", padding: "15px" }}>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <input 
                      type="text" 
                      placeholder="Título de la tarea..." 
                      value={nuevoTitulo} 
                      onChange={(e) => setNuevoTitulo(e.target.value)}
                      required
                      style={{ flex: 2, padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", outline: "none" }}
                    />
                    <input 
                      type="text" 
                      placeholder="Día (Ej: Hoy, Jue 17)" 
                      value={nuevoDia} 
                      onChange={(e) => setNuevoDia(e.target.value)}
                      required
                      style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", outline: "none" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
                    <input 
                      type="time" 
                      value={nuevoHorario} 
                      onChange={(e) => setNuevoHorario(e.target.value)}
                      required
                      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", outline: "none" }}
                    />
                    <select 
                      value={nuevoTipo} 
                      onChange={(e) => setNuevoTipo(e.target.value)}
                      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--color-border)", outline: "none", background: "white" }}
                    >
                      <option value="Tarea">Tarea</option>
                      <option value="Parcial">Parcial</option>
                      <option value="Final">Final</option>
                    </select>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                      <button type="button" onClick={() => setMostrarFormulario(false)} style={{ background: "#e2e8f0", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                        Cancelar
                      </button>
                      <button type="submit" style={{ background: "var(--color-primary)", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {!mostrarFormulario && (
                <button type="button" className="btn-add-tarea-user" onClick={() => setMostrarFormulario(true)}>
                  Agregar tarea
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}