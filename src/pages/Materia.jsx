import { useMateria } from "../hooks/useMateria"

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()

  return (
    <section className="container-section-materia-detalle">
      <div className="container-materia-detalle">
        <header>
          <h3 className="title-name-materia-detalle">
            <strong>
              {materia.id}
            </strong>
            - {materia.nombre}
          </h3>
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
