import { useState } from "react";
import '../styles/recursos.css'
import Header from "../components/Header";

const plansMock = [
  {
    id: "weekly",
    title: "Acceso semanal",
    price: "1.99",
    description: "Ideal para preparar un parcial rápido",
  },
  {
    id: "monthly",
    title: "Acceso mensual",
    price: "5.00",
    description: "Acceso completo a todos los apuntes",
    popular: true,
  },
  {
    id: "yearly",
    title: "Acceso anual",
    price: "40.00",
    description: "Ahorrás más de un 30% anual",
  },
];

export default function Recursos() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
  };

  const handleSubscribe = () => {
    const plan = plansMock.find((p) => p.id === selectedPlan);
    console.log("Plan seleccionado para Mercado Pago:", plan);
  };

  return (
    <div className="container-recursos">
      <Header />

      <div className="content-recursos-wrapper">
        <div className="header-recursos-landing animate-cascade" style={{ animationDelay: "0.05s" }}>
          <div className="title-icon-wrapper">
            <h3>Accedé a todos los apuntes</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <g fill="none">
                <path fill="url(#gradient1)" d="M3 18.336L4.8 17.1V6.9l2.1-2.1h10.44l1.86 2.1l1.128-.678a.34.34 0 0 0 .06-.522L17.88 3.096A.32.32 0 0 0 17.652 3H6.024a.32.32 0 0 0-.228.096l-2.7 2.808A.33.33 0 0 0 3 6.138z"/>
                <path fill="#fefefe" d="M6.9 4.8L4.8 6.9v10.242L6.9 19.2h10.2l2.1-2.1V6.858L17.4 4.8z"/>
                <path fill="url(#gradient2)" d="M20.676 11.664H19.2v5.34L17.1 19.2H6.9l-2.1-2.1L3 18.336l2.478 2.568c.06.06.144.096.228.096h11.946a.33.33 0 0 0 .228-.096l3.024-3.138c.06-.06.096-.15.096-.24V12a.333.333 0 0 0-.324-.336"/>
                <path fill="#1a1a24" d="M9.6 14.4a1.2 1.2 0 1 0 0-2.4a1.2 1.2 0 0 0 0 2.4m4.8 0a1.2 1.2 0 1 0 0-2.4a1.2 1.2 0 0 0 0 2.4"/>
                <defs>
                  <linearGradient id="gradient1" x1="20.209" x2="2.124" y1="4.958" y2="16.505" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#684bfd" /><stop offset=".28" stopColor="#4663e9" /><stop offset=".52" stopColor="#4380e8" /><stop offset=".84" stopColor="#17dac6" /><stop offset="1" stopColor="#18d6c9" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="20.358" x2="2.478" y1="3.648" y2="8.214" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f17165" /><stop offset=".25" stopColor="#f19c5c" /><stop offset=".47" stopColor="#e9be4d" /><stop offset="1" stopColor="#e7c653" />
                  </linearGradient>
                </defs>
              </g>
            </svg>
          </div>
          <p className="subtitle-recursos">
            Resúmenes completos, organizados por materia y profesor. Aprobá más fácil, en menos tiempo.
          </p>

          <div className="por-que-es-pago">
            <h4 className="por-que">¿Por qué es pago?</h4>
            <p>
              Crear apuntes de calidad lleva muchas horas de estudio y organización. 
              Mantenemos el contenido actualizado según cada cátedra.
            </p>
          </div>
        </div>

        <div className="container-cards">
          {plansMock.map((plan, index) => (
            <div
              key={plan.id}
              className={`card-plan ${selectedPlan === plan.id ? "active" : ""} animate-cascade`}
              style={{ animationDelay: `${(index + 2) * 0.08}s` }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <div className="circle-select-plan">
                {selectedPlan === plan.id && <div className="dot" />}
              </div>

              <div className="info-plan">
                <span className="title-plan">{plan.title}</span>
                <span className="description-plan">{plan.description}</span>
              </div>

              <b className="precio">${plan.price}</b>

              {plan.popular && <span className="mas-elegido">MÁS POPULAR</span>}
            </div>
          ))}
        </div>

        <div className="cta-container-fixed animate-cascade" style={{ animationDelay: `${(plansMock.length + 2) * 0.08}s` }}>
          <button className="suscribirme" onClick={handleSubscribe}>
            Desbloquear todos los apuntes
          </button>
        </div>
      </div>
    </div>
  );
}