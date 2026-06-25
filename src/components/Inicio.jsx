import miBannerHero from "../../public/fondo-web-info-track.webp"; 

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <section className="inicio" id="inicio">
      {/* COMPOSICIÓN GEOMÉTRICA PREMIUM DE FONDO */}
      <div className="bg-glow-orb orb-primaria"></div>
      <div className="bg-glow-orb orb-secundaria"></div>
      
      {/* Figuras abstractas en movimiento */}
      <div className="geo-shape shape-anillo-3d"></div>
      <div className="geo-shape shape-grid-3d"></div>
      <div className="geo-shape shape-triangulo-blur"></div>
      
      {/* Elementos flotantes de programación / informática */}
      <div className="code-floating code-tag-1">&lt;code&gt;</div>
      <div className="code-floating code-tag-2">&#123; return true; &#125;</div>
      <div className="code-floating code-tag-3">const app = []</div>      
      <div className="container-inicio-split">
        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div className="container-inicio-texto">
          <div className="title-principal">
            <h1>Seguí tu carrera. <b>Sin excusas.</b></h1>
          </div>
          <div className="description-inicio">
            <p className="texto-inicio">
              Progreso, materias, profesores, tareas y comunidad. Todo lo que un
              estudiante de Informática necesita, en un solo lugar.
            </p>
          </div>
          <div className="buttons-inicio">
            <button className="btn-cta-primary" onClick={() => navigate("/register")}>
              Crear cuenta gratis
            </button>
            <button className="btn-cta-secondary">
              <Link to={"/calendario"}>Ver calendario</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="description-inicio-table">
            <div className="childrem-description-inicio"><p><b>4</b> Carreras</p></div>
            <div className="childrem-description-inicio"><p><b>127</b> Materias</p></div>
            <div className="childrem-description-inicio"><p><b>50+</b> Profesores</p></div>
            <div className="childrem-description-inicio"><p><b>1000+ </b>Estudiantes</p></div>
          </div>
        </div>

        {/* COLUMNA DERECHA: IMAGEN */}
        <div className="container-inicio-grafico">
          <div className="render-3d-composicion">
            <img src={miBannerHero} alt="Ilustración InfoTrack" className="imagen-hero-banner"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;