// Archivo: Recursos.jsx
import { useState } from "react";
import Header from "../components/Header";

//Mock (despues viene del backend)
const plansMock = [
  {
    id: "weekly",
    title: "Acceso semanal",
    price: 1.99,
    description: "Ideal para preparar un parcial",
  },
  {
    id: "monthly",
    title: "Acceso mensual",
    price: 5,
    description: "Acceso completo a todos los apuntes",
    popular: true,
  },
  {
    id: "yearly",
    title: "Acceso anual",
    price: 40,
    description: "Ahorrás más de 30%",
  },
];

export default function Recursos() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
  };

  const handleSubscribe = () => {
    const plan = plansMock.find((p) => p.id === selectedPlan);
    console.log("Plan seleccionado:", plan);

    // aqui luyego Conectamos mercado pago
  };

  return (
    <div className="container-recursos">
      <Header />

      {/* HEADER */}
      <div className="header-recursos-landing">
        <h3>
          Accedé a todos los apuntes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fill="url(#IconifyId19f0bd103f5a8c83f2)"
                d="M3 18.336L4.8 17.1V6.9l2.1-2.1h10.44l1.86 2.1l1.128-.678a.34.34 0 0 0 .06-.522L17.88 3.096A.32.32 0 0 0 17.652 3H6.024a.32.32 0 0 0-.228.096l-2.7 2.808A.33.33 0 0 0 3 6.138z"
              />
              <path
                fill="#e1e7cd"
                d="M6.9 4.8L4.8 6.9v10.242L6.9 19.2h10.2l2.1-2.1V6.858L17.4 4.8z"
              />
              <path
                fill="url(#IconifyId19f0bd103f5a8c83f3)"
                d="M20.676 11.664H19.2v5.34L17.1 19.2H6.9l-2.1-2.1L3 18.336l2.478 2.568c.06.06.144.096.228.096h11.946a.33.33 0 0 0 .228-.096l3.024-3.138c.06-.06.096-.15.096-.24V12a.333.333 0 0 0-.324-.336"
              />
              <path
                fill="#1a1a24"
                d="M9.6 14.4a1.2 1.2 0 1 0 0-2.4a1.2 1.2 0 0 0 0 2.4m4.8 0a1.2 1.2 0 1 0 0-2.4a1.2 1.2 0 0 0 0 2.4"
              />
              <defs>
                <linearGradient
                  id="IconifyId19f0bd103f5a8c83f2"
                  x1="20.209"
                  x2="2.124"
                  y1="4.958"
                  y2="16.505"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#684bfd" />
                  <stop offset=".28" stopColor="#4663e9" />
                  <stop offset=".52" stopColor="#4380e8" />
                  <stop offset=".84" stopColor="#17dac6" />
                  <stop offset="1" stopColor="#18d6c9" />
                </linearGradient>
                <linearGradient
                  id="IconifyId19f0bd103f5a8c83f3"
                  x1="20.358"
                  x2="2.478"
                  y1="3.648"
                  y2="8.214"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#f17165" />
                  <stop offset=".25" stopColor="#f19c5c" />
                  <stop offset=".47" stopColor="#e9be4d" />
                  <stop offset="1" stopColor="#e7c653" />
                </linearGradient>
              </defs>
            </g>
          </svg>
        </h3>

        <p>
          Resúmenes completos, organizados por materia y profesor. Aprobá más
          fácil, en menos tiempo.
        </p>

        <div className="por-que-es-pago">
          <h4>¿Por qué es pago?</h4>
          <p>
            Crear apuntes de calidad lleva muchas horas de estudio, resumen y
            organización. Mantenemos el contenido actualizado según cada
            profesor y materia.
          </p>
        </div>
      </div>

      {/* PLANES */}
      <div className="container-cards">
        {plansMock.map((plan) => (
          <div
            key={plan.id}
            className={`card-plan ${selectedPlan === plan.id ? "active" : ""}`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <div className="circle-select-plan">
              {selectedPlan === plan.id && <div className="dot" />}
            </div>

            <div className="header-plan">
              <h5>{plan.title}</h5>
              <b className="precio">${plan.price}</b>
            </div>

            <div className="info-plan">
              <p>{plan.title}</p>
              <p>{plan.description}</p>
            </div>

            {plan.popular && <b className="mas-elegido">Más elegido</b>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="suscribirme" onClick={handleSubscribe}>
        Desbloquear todos los apuntes
      </button>
    </div>
  );
}
