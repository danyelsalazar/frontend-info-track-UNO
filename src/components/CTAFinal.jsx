import { useNavigate } from "react-router-dom";

const CTAFinal = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-final">
      <div className="cta-container">

        <p className="cta-badge">POR QUÉ ELEGIRNOS</p>

        <h2>
          Ya tenés la info. <span>Ahora aprovechala al máximo.</span>
        </h2>

        <p className="cta-sub">
          Explorá materias, profesores y carreras sin registrarte. 
          Pero con una cuenta podés guardar tu progreso, planificar mejor y tomar decisiones más inteligentes.
        </p>

        <div className="cta-benefits">
          <span>✔ Guardá materias y progreso</span>
          <span>✔ Organizá tu carrera sin perderte</span>
          <span>✔ Elegí mejores profesores</span>
        </div>

        <div className="cta-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/register")}
          >
            Crear cuenta gratis
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/?section=carreras")}
          >
            Seguir explorando
          </button>
        </div>

        <p className="cta-foot">
          Sin tarjeta · Sin compromiso · Empezás en segundos
        </p>

      </div>
    </section>
  );
};

export default CTAFinal;