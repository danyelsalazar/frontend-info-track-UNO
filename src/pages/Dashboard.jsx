import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
import { IconoBienvenida } from "../components/IconoBienvenida";
import { IconAlertCircle, IconBook2, IconChartBar, IconCircleCheck, IconClipboardCheck, } from "@tabler/icons-react";

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
    label: "Plan de estudios",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M20 22V4h-4v2H8V4H4v18z" />
          <path d="M16 6H8V2h8z" />
          <path stroke="#fff" strokeWidth="2" d="M16 4h4v18H4V4h4m8 0V2H8v2m8 0v2H8V4" />
          <path stroke="#fff" strokeLinecap="square" strokeWidth="2" d="M10 12h4m-4 4h4" />
        </g>
      </svg>
    ),
    path: "/plan-estudio",
  },
  {
    label: "Recursos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path fill="#ffffff" fillRule="evenodd" d="M11.934 7.406a1 1 0 0 0 .914.594H19a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5h5.764a.5.5 0 0 1 .447.276zm1.064-1.216a.5.5 0 0 0 .462.31H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.764a2 2 0 0 1 1.789 1.106zM8.5 10.5h7V12h-7zm7 3.5h-7v1.5h7z"/>
      </svg>
    ),
    path: "/recursos",
  },
  {
    label: "Mi perfil",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g fill="none" stroke="#fff" strokeWidth="2">
          <path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
          <circle cx="12" cy="7" r="3" />
        </g>
      </svg>
    ),
    path: "/mi-perfil",
  },
  {
    label: "Mis Materias",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M20.5 2.5h-14a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h14z" />
          <path stroke="#fff" strokeLinecap="square" strokeWidth="2" d="M20.5 21.5h-14a3 3 0 1 1 0-6h14zm0 0v-19h-14a3 3 0 0 0-3 3v12m8-11h5" />
        </g>
      </svg>
    ),
    path: "/mis-materias",
  },
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

  // console.log(carreras[0]);
  
  // Si no viene la carrera en el JSON del backend, usamos una por defecto genérica
  // solo muestra nombre de la primera carrera del arreglo de carreras !!!!!HAY QUE ARREGLAR ESTO LUEGO EN LA IMPLEMENTACION DE VARIAS CARRERAS
  const carreraUsuario = carreras[0] || "Carrera no reconocida";

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

        </div>
      </div>
    </>
  );
}