import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  IconBook2, IconClipboardText, IconStar, IconFolder, 
  IconChevronRight, IconChevronLeft 
} from "@tabler/icons-react";
import "../styles/sidebar.css";

const ACCESOS = [
  {
    label: "Mis Materias",
    icon: <IconBook2 size={22} />,
    path: "/perfil/mis-materias",
  },
  {
    label: "Mis Tareas",
    icon: <IconClipboardText size={22} />,
    path: "/perfil/mis-tareas",
  },
  {
    label: "Mis Valoraciones",
    icon: <IconStar size={22} />,
    path: "/mi-perfil",
  },
  {
    label: "Recursos",
    icon: <IconFolder size={22} />,
    path: "/recursos",
  }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "is-open" : ""}`}>
      {/* Botón de flecha a la mitad del borde */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        {isOpen ? <IconChevronLeft size={16} /> : <IconChevronRight size={16} />}
      </button>

      {/* Contenido del menú lateral */}
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <span className="brand-dot"></span>
          {isOpen && <span className="brand-text">InfoTrack</span>}
        </div>

        <nav className="sidebar-nav">
          {ACCESOS.map((acceso) => (
            <NavLink 
              key={acceso.path} 
              to={acceso.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}
            >
              <div className="sidebar-icon-wrapper">
                {acceso.icon}
              </div>
              {isOpen && <span className="sidebar-label">{acceso.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}