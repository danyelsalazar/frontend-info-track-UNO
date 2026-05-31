import { IconBrandWhatsapp, IconCalendarCheck, IconStar } from "@tabler/icons-react";
import { useMateria } from "../hooks/useMateria"
import { MateriaBadge } from "../components/MateriaBadge";

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()
  console.log(materia)

  return (
    <section className="container-section">
      <div className="container-materia">
        <header className="section">
          <h3 className="materia-title">
            {materia.nombre} <strong>({materia.id})</strong>
          </h3>
          <div className="materia-badge-container">
            <p className="badge">
              <IconCalendarCheck size={14}/>
              1º y 2º cuatrimestre
            </p>
            <p className="badge">
              <IconStar size={14}/>
              Promocionable
            </p>
            <button className="materia-whatsapp-btn">
              <IconBrandWhatsapp size={15}/>
              Whatsapp
            </button>
          </div>
        </header>
        <main>
          <section className="section">
            <h3 className="section-title">
              Mi estado
            </h3>
            <div className="materia-estados-container">
              <button className="button-cursando">
                Cursando
              </button>
              <button className="button-regularizada">
                Regularizada
              </button>
              <button className="button-aprobada">
                Aprobada
              </button>
              <button className="button-promocionada">
                Promocionada
              </button>
            </div>
          </section>
          <section className="section">
            <h3 className="section-title">
              Correlativas
            </h3>
            <ul className="materia-correlativas-container">
              {
                materia.correlativas
                ? materia.correlativas.map(correlativa => {
                    return <MateriaBadge materia={correlativa}/>
                  })
                : ''
              }
            </ul>
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
