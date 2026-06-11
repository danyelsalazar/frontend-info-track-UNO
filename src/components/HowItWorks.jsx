const steps = [
  {
    step: "01",
    title: "Elegí tu carrera",
    desc: "Accedé al plan completo con todas las materias organizadas",
  },
  {
    step: "02",
    title: "Seguimiento de progreso",
    desc: "Marcá materias, correlativas y avanzá sin perderte",
  },
  {
    step: "03",
    title: "Tomá mejores decisiones",
    desc: "Consultá profesores, horarios y reseñas antes de cursar",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-section">
      <div className="section-header">
        <p className="section-badge">CÓMO FUNCIONA</p>
        <h2>Organizar tu carrera nunca fue tan simple</h2>
        <p className="section-sub">
          En solo tres pasos tenés todo bajo control.
        </p>
      </div>

      <div className="how-grid">
        {steps.map((s, i) => (
          <div key={i} className="how-card">
            <span className="how-step">{s.step}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;