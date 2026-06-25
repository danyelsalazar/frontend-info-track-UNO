import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Footer = () => {
  const { userIdentity } = useAuthContext()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* logo + descripción */}
        <div className="footer-brand">
          <div className="container-svg-logo-footer">
            <svg
              className="svg-logo-footer"
              viewBox="0 0 14 14"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="1" y="1" width="5" height="5" rx="1" />
              <rect x="8" y="1" width="5" height="5" rx="1" />
              <rect x="1" y="8" width="5" height="5" rx="1" />
              <rect x="8" y="8" width="5" height="5" rx="1" />
            </svg>
          </div>

          <p className="footer-description">
            Plataforma académica para estudiantes de informática de la Universidad Nacional del Oeste. 
            Seguimiento de materias, profesores y progreso en un solo lugar.
          </p>
        </div>

        {/* links */}
        <div className="footer-links">
          <div>
            <h4>Secciones</h4>
            <Link to="/carreras">Carreras</Link>
            <Link to="/profesores">Profesores</Link>
            <Link to="/materias">Materias</Link>
            <Link to="/calendario">Calendario</Link>
          </div>

          <div>
            <h4>Cuenta</h4>
            {!userIdentity
              ? (
                <>
                  <Link to="/login">Ingresar</Link>
                  <Link to="/register">Registrarse</Link>
                </>
              )
              : <Link to="/perfil">Mi perfil</Link>
            }
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} InfoTrack — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
