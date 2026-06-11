import { IconCheck, IconBolt, IconUsers, IconBook } from "@tabler/icons-react";

const features = [
  {
    icon: <IconBook size={18} />,
    title: "Seguimiento de materias",
    desc: "Visualizá tu progreso, correlativas y estado en tiempo real",
  },
  {
    icon: <IconUsers size={18} />,
    title: "Profesores y reseñas",
    desc: "Elegí mejor con opiniones reales de otros estudiantes",
  },
  {
    icon: <IconBolt size={18} />,
    title: "Todo en un solo lugar",
    desc: "Horarios, comisiones, tareas y más, sin perder tiempo",
  },
  {
    icon: <IconCheck size={18} />,
    title: "Organización real",
    desc: "Dejá de improvisar y empezá a avanzar en serio",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-header">
        <p className="features-badge">TODO EN UNA APP</p>
        <h2>
          Organizá tu carrera <span>sin caos</span>
        </h2>
        <p className="features-sub">
          Diseñada para estudiantes de informática que quieren avanzar en serio.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;