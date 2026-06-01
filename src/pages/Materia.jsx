import { IconBrandWhatsapp, IconBuilding, IconCalendarCheck, IconCalendarWeek, IconCirclePlus, IconLink, IconStar, IconUser } from "@tabler/icons-react";
import { useMateria } from "../hooks/useMateria"
import { MateriaBadge } from "../components/MateriaBadge";
import { Link } from "react-router-dom";

const ProfesorCard = ({profesor}) => {
  return (
    <Link 
      className="materia-profesor-card"
      to={`/profesor/${profesor.id}`}
    >
      <div className="materia-profesor-avatar">
        {profesor.siglas}
      </div>
      <div className="materia-profesor-card-content">
        <h4>
          {profesor.apellido}, {profesor.nombre}
        </h4>
        <p>
          {profesor.email}
        </p>
      </div>
    </Link>
  )
}

const NoCorrelativas = () => {
  return (
    <p className="section-text">
      Esta materia no tiene correlativas
    </p>
  )
}

const NoProfesores = () => {
  return (
    <p className="section-text">
      No hay información sobre profesores
    </p>
  )
}

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()

  if(loading) {
    return (
      <p>Cargando...</p>
    )
  }

  if(!materia) {
    return (
      <p>Materia no existe</p>
    )
  }

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
              {
                materia?.cuatrimestreDictado.length === 2
                  ? "1º y 2º cuatrimestre"
                  : `${materia.cuatrimestreDictado[0]}º cuatrimestre`             
              }
              
            </p>
            {
              materia.promocionable 
              && (
                <p className="badge">
                  <IconStar size={14}/>
                  Promocionable
                </p>
              )
            }
            {
              materia.linkWhatsapp 
              && (
                <a 
                  className="materia-whatsapp-btn"
                  href={materia.linkWhatsapp}
                  target="noblank"
                >
                  <IconBrandWhatsapp size={15}/>
                  Whatsapp
                </a>
              )
            }
            
            
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
              materia.correlativas.length > 0
              ? materia.correlativas.map(correlativa => <MateriaBadge materia={correlativa}/>)
              : <NoCorrelativas />
            }
          </ul>
        </section>
        <section className="section">
          <h3 className="section-title">
            <IconUser size={16}/>
            Profesores
          </h3>
          <ul className="materia-profesores-container">
            {
              materia.profesores.length > 0 
              ? materia?.profesores.map(profesor => <ProfesorCard profesor={profesor}/>)
              : <NoProfesores />
            }
          </ul>
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
