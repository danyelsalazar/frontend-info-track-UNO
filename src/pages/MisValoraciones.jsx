import "../styles/misValoraciones.css";
import { IconStars } from "@tabler/icons-react";
import Header from "../components/Header";

function MisValoraciones() {
  return (
    <div className="valoraciones-container">
      <Header />
      
      <div className="valoraciones-content-wrapper animate-cascade" style={{ animationDelay: "0.1s" }}>
        <div className="valoraciones-card-coming">
          <div className="icon-wrapper-stars">
            <IconStars size={44} className="stars-icon" />
          </div>
          
          <h3>Mis Valoraciones</h3>
          <span className="badge-coming">PRÓXIMAMENTE</span>
          
          <p>
            ¡Muy pronto vas a poder calificar los apuntes de tus compañeros, dejar reseñas de las cátedras y guardar tus profesores favoritos en un solo lugar!
          </p>
          
          <div className="valoraciones-footer-hint">
            Estamos procesando los datos de las materias de la UNO para armar el mejor sistema de feedback.
          </div>
        </div>
      </div>
    </div>
  );
}

export {MisValoraciones}