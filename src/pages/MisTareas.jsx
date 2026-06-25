import "../styles/tareas.css";
import { useState } from "react";
import {
  IconCircleCheck,
  IconCircle,
  IconTrash,
  IconPlus,
  IconCalendar,
  IconClock,
  IconChecklist,
} from "@tabler/icons-react";
import Header from "../components/Header";

const TAREAS_INICIALES = [
  
];

export const MisTareas = () => {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoHorario, setNuevoHorario] = useState("");
  const [nuevoDia, setNuevoDia] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("Tarea");
  const [nuevaPrioridad, setNuevaPrioridad] = useState("Media");

  // Métricas calculadas en tiempo real
  const totalTareas = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = totalTareas - completadas;

  const handleClickTask = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  const handleEliminarTarea = (index, e) => {
    e.stopPropagation(); // Evita que se dispare el click de completado
    setTareas(tareas.filter((_, i) => i !== index));
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
      prioridad: nuevaPrioridad,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);

    setNuevoTitulo("");
    setNuevoHorario("");
    setNuevoDia("");
    setNuevoTipo("Tarea");
    setNuevaPrioridad("Media");
    setMostrarFormulario(false);
  };

  return (
    <div className="tareas-section page-content">
      <Header />
      <div className="tareas-header-container">
        <h3 className="title-tareas-user">Gestión de Tareas</h3>
        {!mostrarFormulario && (
          <button
            type="button"
            className="btn-add-inline"
            onClick={() => setMostrarFormulario(true)}
          >
            <IconPlus size={16} /> Nueva Tarea
          </button>
        )}
      </div>

      {/* 1. PANEL DE MÉTRICAS (NUEVO) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-val">{pendientes}</span>
          <span className="metric-label">Pendientes</span>
        </div>
        <div className="metric-card">
          <span className="metric-val">
            {completadas}/{totalTareas}
          </span>
          <span className="metric-label">Completadas</span>
        </div>
        <div className="metric-card highlight">
          <span
            className="metric-val"
            style={{ fontSize: "1rem", paddingTop: "6px" }}
          >
            {tareas.find((t) => !t.completada)?.title || "Ninguna"}
          </span>
          <span className="metric-label">Próxima Urgente</span>
        </div>
      </div>
      {/* FORMULARIO FLOTANTE (MODAL) */}
      {mostrarFormulario && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarFormulario(false)}
        >
          <form
            onSubmit={handleAgregarTarea}
            className="tarea-form-card"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro del formulario
          >
            <h4 className="modal-title">Nueva Tarea</h4>

            <div className="form-row-main">
              <input
                type="text"
                placeholder="Título de la tarea o examen..."
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                required
                className="form-input-title"
              />
              <input
                type="text"
                placeholder="Día (Ej: Hoy, Jue 17)"
                value={nuevoDia}
                onChange={(e) => setNuevoDia(e.target.value)}
                required
                className="form-input-day"
              />
            </div>

            <div className="form-row-sub">
              <div className="form-inputs-group">
                <input
                  type="time"
                  value={nuevoHorario}
                  onChange={(e) => setNuevoHorario(e.target.value)}
                  required
                />
                <select
                  value={nuevoTipo}
                  onChange={(e) => setNuevoTipo(e.target.value)}
                >
                  <option value="Tarea">Tarea</option>
                  <option value="Parcial">Parcial</option>
                  <option value="Final">Final</option>
                </select>
                <select
                  value={nuevaPrioridad}
                  onChange={(e) => setNuevaPrioridad(e.target.value)}
                >
                  <option value="Baja">Prioridad Baja</option>
                  <option value="Media">Prioridad Media</option>
                  <option value="Alta">Prioridad Alta</option>
                </select>
              </div>
            </div>
            <div className="actions-container">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="btn-cancelar-tareas"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-tareas">
                  Guardar
                </button>
              </div>
          </form>
        </div>
      )}
      {/* 2. ESTADO VACÍO (NUEVO) */}
      {totalTareas === 0 && (
        <div className="empty-state-card">
          <IconChecklist size={48} className="empty-icon" />
          <h4>¡Todo limpio por acá!</h4>
          <p>
            No tenés entregas ni parciales registrados. Disfrutá el tiempo libre
            o agrega una nueva meta.
          </p>
        </div>
      )}

      <ul className="tareas-list">
        {tareas.map((t, i) => (
          <li
            key={i}
            className={`tarea-item prio-${t.prioridad.toLowerCase()}`}
            style={{ opacity: t.completada ? 0.6 : 1 }}
          >
            <div className="horario-task">
              <span className="time-text">
                <IconClock size={14} /> {t.horario}
              </span>
              <span className="tarea-dia">
                <IconCalendar size={12} /> {t.dia}
              </span>
            </div>

            <div className="divisor-horario-info"></div>

            <div className="tarea-item-description">
              <div className="task-description-sub">
                <span
                  className="tarea-title"
                  style={{
                    textDecoration: t.completada ? "line-through" : "none",
                  }}
                >
                  {t.title}
                </span>
                <div className="badges-wrapper">
                  <span className={`tarea-badge ${t.badgeClass}`}>
                    {t.tipo}
                  </span>
                  <span className={`prio-badge ${t.prioridad.toLowerCase()}`}>
                    {t.prioridad}
                  </span>
                </div>
              </div>

              <div className="task-actions-wrapper">
                <button
                  className="task-action-btn check"
                  onClick={() => handleClickTask(i)}
                >
                  {t.completada ? (
                    <IconCircleCheck size={22} color="#31bb8d" />
                  ) : (
                    <IconCircle size={22} color="#009cd1" />
                  )}
                </button>
                <button
                  className="task-action-btn delete"
                  onClick={(e) => handleEliminarTarea(i, e)}
                >
                  <IconTrash size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
