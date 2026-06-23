import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* logo + descripción */}
        <div className="footer-brand">
          <div className="container-logo-header">
            <div className="container-svg-logo-header">
              <svg className="svg-logo-header" viewBox="0 0 14 14">
                <rect x="1" y="1" width="5" height="5" rx="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" />
                <rect x="1" y="8" width="5" height="5" rx="1" />
                <rect x="8" y="8" width="5" height="5" rx="1" />
              </svg>
            </div>
            <p className="footer-logo-text">InfoTrack</p>
          </div>

          <p className="footer-description">
            Plataforma académica para estudiantes de informática. 
            Seguimiento de materias, profesores y progreso en un solo lugar.
          </p>
        </div>

        {/* links */}
        <div className="footer-links">
          <div>
            <h4>Secciones</h4>
            <a href="#">Carreras</a>
            <a href="#">Cuatrimestre</a>
            <Link to="/profesores">Profesores</Link>
            <Link to="/materias">Materias</Link>
            <a href="#">Novedades</a>
          </div>

          <div>
            <h4>Cuenta</h4>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        </div>

      </div>

      {/* bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} InfoTrack — Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;