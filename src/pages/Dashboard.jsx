import { useNavigate } from "react-router-dom";
import GraficoMaterias from "../components/GraficoMaterias";
import HeaderDashboard from "../components/HeaderDashboard";
import "../styles/dashboard.css";
import AddMateriaAlumno from "../components/AddMateriaAlumno";
// ── DATA ──────────────────────────────────────────────
const STATS = [
  { value: "18",  label: "Materias aprobadas", colorClass: "stat-teal"    },
  { value: "4",   label: "Cursando ahora",     colorClass: "stat-primary" },
  { value: "7.8", label: "Promedio general",   colorClass: "stat-red"     },
  { value: "25",  label: "Materias restantes", colorClass: "stat-muted"   },
];

const TAREAS = [
  { title: "Parcial de Bases de Datos", dia: "Hoy",    tipo: "Final",   dotClass: "dot-red",    badgeClass: "badge-red"    },
  { title: "TP Algoritmos — entrega",   dia: "Jue 17", tipo: "Tarea",   dotClass: "dot-yellow", badgeClass: "badge-yellow" },
  { title: "Parcial de Redes II",       dia: "Vie 18", tipo: "Parcial", dotClass: "dot-blue",   badgeClass: "badge-blue"   },
];

const ACCESOS = [
  { label: "Plan de estudios", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none"><path d="M20 22V4h-4v2H8V4H4v18z"/><path d="M16 6H8V2h8z"/><path stroke="#666666" strokeWidth="2" d="M16 4h4v18H4V4h4m8 0V2H8v2m8 0v2H8V4"/><path stroke="#666666" strokeLinecap="square" strokeWidth="2" d="M10 12h4m-4 4h4"/></g></svg> },
  { label: "Calendario",       icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="var(--color-primary)" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"/></svg> },
  { label: "Reseñas",          icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="#666666" strokeLinejoin="round" strokeWidth="2" d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873z"/></svg>},
  { label: "Recursos",         icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20"><path fill="#666666" d="M18.405 4.799c-.111-.44-.655-.799-1.21-.799h-6.814c-.554 0-1.33-.318-1.722-.707l-.596-.588C7.671 2.316 6.896 2 6.342 2H3.087c-.555 0-1.059.447-1.12.994L1.675 6h16.931zM19.412 7H.588a.58.58 0 0 0-.577.635l.923 9.669A.77.77 0 0 0 1.7 18h16.6a.77.77 0 0 0 .766-.696l.923-9.669A.58.58 0 0 0 19.412 7"/></svg> },
  { label: "Mi perfil",        icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" stroke="var(--color-primary)" strokeWidth="2"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg> },
  { label: "Mis Materias",        icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none"><path d="M20.5 2.5h-14a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h14z"/><path stroke="#666666" strokeLinecap="square" strokeWidth="2" d="M20.5 21.5h-14a3 3 0 1 1 0-6h14zm0 0v-19h-14a3 3 0 0 0-3 3v12m8-11h5"/></g></svg>}

];

const dataMock = [
  { label: 'Aprobadas', value: STATS[0].value, color: 'var(--color-accent)' },
  { label: 'Cursando', value: STATS[1].value, color: 'var(--color-primary)' },
  { label: 'Restantes', value: STATS[3].value , color: 'var(--color-dark)' },
];


// ── COMPONENT ─────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-page">
      <AddMateriaAlumno/>
      <HeaderDashboard />
      {/* HERO */}
      <div className="dashboard-hero">
        <h1 className="hero-greeting">Hola Equipo 👋</h1>
        <p className="hero-sub">Licenciatura en Informática · Año 2026</p>
        <button className="exit-dashboard" onClick={()=>{navigate("/")}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20"><path fill="white" d="M13 3v2h2v10h-2v2h4V3zm0 8V9H5.4l4.3-4.3l-1.4-1.4L1.6 10l6.7 6.7l1.4-1.4L5.4 11z"/></svg>
      </button>
      </div>

      {/* MAIN CARD */}
      <div className="dashboard-card">

        {/* PROGRESO */}
        <div className="progress-section">
          <div className="progress-row">
            <span className="progress-label">Progreso de la carrera</span>
            <span className="progress-value">42% completado</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "42%" }} />
          </div>
        </div>

        {/* STATS */}
        <div className="container-materias-grafico">

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <span className={`stat-value ${s.colorClass}`}>{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
          <GraficoMaterias data={dataMock}/>
        </div>
        {/* TAREAS */}
        <div className="tareas-section">
          <p className="section-title title-dashboard">Próximas tareas</p>
          <ul className="tareas-list">
            {TAREAS.map((t, i) => (
              <li key={i} className="tarea-item">
                <span className="tarea-title">{t.title}</span>
                <span className="tarea-dia">{t.dia}</span>
                <span className={`tarea-badge ${t.badgeClass}`}>{t.tipo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ACCESOS RÁPIDOS */}
        <div className="accesos-section">
          <p className="section-title title-dashboard">Accesos rápidos</p>
          <div className="accesos-grid">
            {ACCESOS.map((a, i) => (
              <button key={i} className="acceso-btn">
                <span className="acceso-icon">{a.icon}</span>
                <span className="acceso-label">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
