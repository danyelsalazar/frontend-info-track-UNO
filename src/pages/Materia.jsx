import { IconBrandWhatsapp, IconBuilding, IconCalendarCheck, IconCalendarWeek, IconCirclePlus, IconLink, IconStar, IconUser } from "@tabler/icons-react";
import { useMateria } from "../hooks/useMateria"
import { MateriaBadge } from "../components/MateriaBadge";

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()

  return (
    <section className="container-section">
      <header className="materia-header section">
        <div className="materia-header-info">
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
            <a className="materia-whatsapp-btn">
              <IconBrandWhatsapp size={15}/>
              Whatsapp
            </a>
          </div>
        </div>
        <aside className="materia-header-estado">
          <button className="materia-button-estado">
            <IconCirclePlus size={16}/>
            Indicar mi estado
          </button>
        </aside>
      </header>
      <main>
        <section className="section">
          <h3 className="section-title">
            <IconLink size={16}/>
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
            <IconUser size={16}/>
            Profesores
          </h3>
        </section>
        <section className="section">
          <h3 className="section-title">
            <IconCalendarWeek size={16}/>
            Comisiones
          </h3>
        </section>
        <section className="section">
          <h3 className="section-title">
            <IconBuilding size={16}/>
            Carreras
          </h3>
        </section>
      </main>
    </section>
  );
};

export default MateriaDetalle;
