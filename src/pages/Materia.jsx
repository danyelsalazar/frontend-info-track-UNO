import { useMateria } from "../hooks/useMateria"

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()

  return (
    <section className="container-section">
      <div className="container-materia">
        <header className="section">
          <h3 className="materia-title">
            Algebra y Geometría Analítica <strong>(01017)</strong>
          </h3>
          <div className="materia-badge-container">
            <p className="badge">
              1º y 2º cuatrimestre
            </p>
            <p className="badge">
              Promocionable
            </p>
            <button className="materia-whatsapp-btn">
              Whatsapp
            </button>
          </div>
        </header>
        <main>
          <section className="section">
            <h3 className="section-title">
              Mi estado
            </h3>
          </section>
          <section className="section">
            <h3 className="section-title">
              Correlativas
            </h3>
          </section>
          <section className="section">
            <h3 className="section-title">
              Profesores
            </h3>
          </section>
          <section className="section">
            <h3 className="section-title">
              Comisiones
            </h3>
          </section>
          <section className="section">
            <h3 className="section-title">
              Carreras
            </h3>
          </section>
        </main>
      </div>
    </section>
  );
};

export default MateriaDetalle;
