import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconBook2,
  IconClipboardText,
  IconStar,
  IconFolder,
  IconChevronRight,
  IconChevronLeft,
  IconLogout2,
} from "@tabler/icons-react";
import "../styles/sidebar.css";

import { useDashboard } from "../hooks/useDashboard";

const ACCESOS = [
  {
    label: "Dashboard",
    icon: <IconLayoutDashboard size={22} />,
    path: "/perfil",
  },
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
  { label: "Recursos", icon: <IconFolder size={22} />, path: "/recursos" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cerrarSesion } = useDashboard();

  return (
    <>
      {/* Fondo oscuro para cerrar el menú en móviles */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar-container ${isOpen ? "is-open" : ""}`}>
        {/* Botón flotante tipo pestaña */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IconChevronLeft size={16} />
          ) : (
            <IconChevronRight size={16} />
          )}
        </button>

        <div
          className="sidebar-content"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <nav className="sidebar-nav" style={{ flex: 1 }}>
            {ACCESOS.map((acceso) => (
              <NavLink
                key={acceso.path}
                to={acceso.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setIsOpen(false)}
                end={acceso.path === "/perfil"}
              >
                <div className="sidebar-icon-wrapper">{acceso.icon}</div>
                {isOpen && (
                  <span className="sidebar-label">{acceso.label}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Botón de cerrar sesión alineado exactamente igual a los links */}
          <div className="sidebar-footer" style={{ marginTop: "auto" }}>
            <button
              onClick={cerrarSesion}
              className="sidebar-link"
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="sidebar-icon-wrapper">
                <IconLogout2 size={22} />
              </div>
              {isOpen && <span className="sidebar-label">Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
