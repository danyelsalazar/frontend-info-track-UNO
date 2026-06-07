import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import MultiProgressBar from "../components/MultiProgressBar";
// ── DATA ──────────────────────────────────────────────
const TAREAS = [
  {
    title: "Parcial de Bases de Datos",
    dia: "Hoy",
    tipo: "Final",
    horario: "09:00",
    dotClass: "dot-red",
    badgeClass: "badge-red",
  },
  {
    title: "TP Algoritmos — entrega",
    dia: "Jue 17",
    tipo: "Tarea",
    horario: "09:00",
    dotClass: "dot-yellow",
    badgeClass: "badge-yellow",
  },
  {
    title: "Parcial de Redes II",
    dia: "Vie 18",
    tipo: "Parcial",
    horario: "09:00",
    dotClass: "dot-blue",
    badgeClass: "badge-blue",
  },
];

const ACCESOS = [
  {
    label: "Plan de estudios",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="M20 22V4h-4v2H8V4H4v18z" />
          <path d="M16 6H8V2h8z" />
          <path
            stroke="#fff"
            strokeWidth="2"
            d="M16 4h4v18H4V4h4m8 0V2H8v2m8 0v2H8V4"
          />
          <path
            stroke="#fff"
            strokeLinecap="square"
            strokeWidth="2"
            d="M10 12h4m-4 4h4"
          />
        </g>
      </svg>
    ),
    path: "/plan-estudio",
  },
  {
    label: "Recursos",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
      >
        <path
          fill="#fff"
          d="M18.405 4.799c-.111-.44-.655-.799-1.21-.799h-6.814c-.554 0-1.33-.318-1.722-.707l-.596-.588C7.671 2.316 6.896 2 6.342 2H3.087c-.555 0-1.059.447-1.12.994L1.675 6h16.931zM19.412 7H.588a.58.58 0 0 0-.577.635l.923 9.669A.77.77 0 0 0 1.7 18h16.6a.77.77 0 0 0 .766-.696l.923-9.669A.58.58 0 0 0 19.412 7"
        />
      </svg>
    ),
    path: "/recursos",
  },
  {
    label: "Mi perfil",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="#fff" strokeWidth="2">
          <path
            strokeLinejoin="round"
            d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
          />
          <circle cx="12" cy="7" r="3" />
        </g>
      </svg>
    ),
    path: "/mi-perfil",
  },
  {
    label: "Mis Materias",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="M20.5 2.5h-14a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h14z" />
          <path
            stroke="#fff"
            strokeLinecap="square"
            strokeWidth="2"
            d="M20.5 21.5h-14a3 3 0 1 1 0-6h14zm0 0v-19h-14a3 3 0 0 0-3 3v12m8-11h5"
          />
        </g>
      </svg>
    ),
    path: "/mis-materias",
  },
];

// ── COMPONENT ─────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  // stado tarea lista
  const [tarea, setTarea] = useState(true);
  // clik tarea
  const handleClickTast = () => {
    setTarea(!tarea);
  };
  return (
    <>
      <Header />
      <div className="dashboard-page">
        {/* MAIN CARD */}
        <div className="dashboard-card">
          {/* PROGRESO */}
          <div className="progress-section">
            <div className="progress-row">
              <span className="progress-label">Progreso de la carrera</span>
              <span className="progress-value">
                <b>42%</b> Progreso
              </span>
            </div>
            <MultiProgressBar
              data={[
                { value: 12, color: "#31bb8d" },
                { value: 5, color: "#7c3aed" },
                { value: 3, color: "#fb9609" },
              ]}
            />
          </div>

          {/* Iconos info de las materias*/}
          <div className="container-materias-grafico">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-aprobadas">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="#ffffff"
                      d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"
                    />
                  </svg>
                </div>
                <span>18</span>
                <span className="stat-label">Aprobadas</span>
              </div>
              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-cursando">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4M11 7h1v5.42l4.7 2.71l-.5.87l-5.2-3z"
                    />
                  </svg>
                </div>
                <span>5</span>
                <span className="stat-label">Cursando</span>
              </div>
              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-restantes">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="#ffffff"
                        d="M4 7v2h16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2"
                      />
                      <path
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 5h2a2 2 0 0 1 2 2v2H4V7a2 2 0 0 1 2-2h2m8 0V3m0 2H8m0-2v2M4 9.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.5"
                      />
                    </g>
                  </svg>
                </div>
                <span>34</span>
                <span className="stat-label">Restantes</span>
              </div>
              <div className="stat-card">
                <div className="icono-info-user-materias icono-info-user-materias-promedio">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M14.363 4.638Q14 4.275 14 3.75t.363-.888t.887-.362t.888.363t.362.887t-.363.888T15.25 5t-.888-.363m0 16.5Q14 20.776 14 20.25t.363-.888t.887-.362t.888.363t.362.887t-.363.888t-.887.362t-.888-.363m4-13Q18 7.775 18 7.25t.363-.888T19.25 6t.888.363t.362.887t-.363.888t-.887.362t-.888-.363m0 9.5Q18 17.276 18 16.75t.363-.888t.887-.362t.888.363t.362.887t-.363.888t-.887.362t-.888-.363m1.5-4.75Q19.5 12.526 19.5 12t.363-.888t.887-.362t.888.363T22 12t-.363.888t-.887.362t-.888-.363M4.613 5.25q2.613-2.825 6.413-3.2q.4-.05.688.238T12 3q0 .4-.262.7t-.663.35q-3.025.35-5.05 2.6T4 12q0 3.125 2.025 5.363t5.05 2.587q.4.05.663.35T12 21q0 .425-.288.713t-.687.237Q7.2 21.575 4.6 18.75T2 12t2.613-6.75m5.975 8.163Q10 12.825 10 12q0-.125.013-.262t.062-.263L8.7 10.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l1.375 1.375q.1-.025.525-.075q.825 0 1.413.588T14 12t-.587 1.413T12 14t-1.412-.587"
                    />
                  </svg>
                </div>
                <span>7</span>
                <span className="stat-label">Promedio</span>
              </div>
            </div>
          </div>
          {/* TAREAS */}
          <div className="tareas-section">
            <ul className="tareas-list">
              {TAREAS.map((t, i) => (
                <li key={i} className="tarea-item">
                  <div className="horario-task">
                    {t.horario}
                    <span className="tarea-dia">{t.dia}</span>
                  </div>
                  <div className="divisor-horario-info"></div>
                  <div className="tarea-item-description">
                    <div className="task-description-sub">
                      <span className="tarea-title">{t.title}</span>
                      <span className={`tarea-badge ${t.badgeClass}`}>
                        {t.tipo}
                      </span>
                    </div>
                    <div
                      className="task-day"
                      onClick={() => {
                        handleClickTast();
                      }}
                    >
                      {tarea ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#009cd1"
                            d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#009cd1"
                            d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
        </div>
      </div>
    </>
  );
}
