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
            <img src="../../public/favicon.png" alt="info-track" style={{width: "45px"}}/>
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