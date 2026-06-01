import { Link } from "react-router-dom";
import { IconBrandWhatsapp, IconBuilding, IconCalendarCheck, IconCalendarWeek, IconCirclePlus, IconLink, IconStar, IconUser } from "@tabler/icons-react";
import { useMateria } from "../hooks/useMateria"
import { MateriaBadge } from "../components/MateriaBadge";
import { BackButton } from "../components/BackButton";

const HeaderSection = ({materia}) => {
  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          {materia.nombre} <strong>({materia.id})</strong>
        </h3>
        <button className="materia-button-estado">
          <IconCirclePlus size={16}/>
          Indicar estado
        </button>
      </div>
      <BadgesContainer materia={materia}/>
    </header>
  )
}

const CorrelativasSection = ({correlativas}) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconLink size={16}/>
        Correlativas
      </h3>
      <ul className="materia-correlativas-container">
        {
          correlativas.length > 0
          ? correlativas.map(correlativa => <MateriaBadge materia={correlativa} key={correlativa.id}/>)
          : <p className="section-text"> Esta materia no tiene correlativas </p>
        }
      </ul>
    </section>
  )
}

const ProfesoresSection = ({profesores}) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconUser size={16}/>
        Profesores
      </h3>
      <ul className="materia-profesores-container">
        {
          profesores.length > 0 
          ? profesores.map(profesor => <ProfesorCard profesor={profesor} key={profesor.id}/>)
          : <p className="section-text">No hay información sobre profesores</p>
        }
      </ul>
    </section>
  )
}

const ComisionesSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconCalendarWeek size={16}/>
        Comisiones
      </h3>
    </section>
  )
}

const CarrerasSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBuilding size={16}/>
        Carreras
      </h3>
    </section>
  )
} 

const BadgesContainer = ({materia}) => {
  return (
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
            id="whatsapp-btn"
            className="badge"
            href={materia.linkWhatsapp}
            target="noblank"
          >
            <IconBrandWhatsapp size={15}/>
            Whatsapp
          </a>
        )
      }
    </div>
  )
}

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

const Materia = () => {
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
    <main className="page-content">
      <BackButton />
      <section className="container-section">
        <HeaderSection materia={materia}/>
        <main>
          <CorrelativasSection correlativas={materia.correlativas}/>
          <ProfesoresSection profesores={materia.profesores}/>
          <ComisionesSection />
          <CarrerasSection />
        </main>
      </section>
    </main>
  );
};

export default Materia;
