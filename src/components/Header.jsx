import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container-logo-header">
        <div className="container-svg-logo-header">
          <svg
            className="svg-logo-header"
            viewBox="0 0 14 14"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="1" y="1" width="5" height="5" rx="1" />
            <rect x="8" y="1" width="5" height="5" rx="1" />
            <rect x="1" y="8" width="5" height="5" rx="1" />
            <rect x="8" y="8" width="5" height="5" rx="1" />
          </svg>
        </div>
        <div className="text-logo">
          <p>InfoTrack</p>
        </div>
      </div>

      {/* botón hamburguesa */}
      <button className={`menu-toggle ${open ? "hamburquesa-active": ""}`} onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav-container ${open ? "active" : ""}`}>
        <ul>
          <li className="item-nav">
            <a href="#">Carreras</a>
          </li>
          <li className="item-nav">
            <a href="#">Cuatrimestre</a>
          </li>
          <li className="item-nav">
            <a href="#">Profesores</a>
          </li>
          <li className="item-nav">
            <a href="#">Novedades</a>
          </li>
          <li className="item-nav button-ingresar">
            <a href="#">Ingresar</a>
          </li>
          <li className="item-nav button-ingresar">
            <a href="#">Registrarse</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
