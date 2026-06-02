import { Link } from "react-router-dom";
import { IconBrandWhatsapp, IconBuilding, IconCalendarCheck, IconCalendarWeek, IconCirclePlus, IconLink, IconStar, IconUsersGroup } from "@tabler/icons-react";
import { useMateria } from "../hooks/useMateria"
import { MateriaBadge } from "../components/MateriaBadge";
import { BackButton } from "../components/BackButton";
import { Rating } from "@mui/material";

const HeaderSection = ({materia}) => {
  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          {materia.nombre} <strong>({materia.id})</strong>
        </h3>
        <button className="materia-button-estado">
          <IconCirclePlus size={14}/>
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
        <IconUsersGroup size={16}/>
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

const ComisionesSection = ({comisionesActuales, comisionesAnteriores}) => {
  const cuatrimestreActual = new Date().getMonth() < 7 ? 1 : 2
  const anioActual = new Date().getFullYear()
  const cuatrimestreAnterior = cuatrimestreActual === 1 ? 2 : 1
  const anioAnterior = cuatrimestreActual === 1 ? anioActual - 1 : anioActual

  // Si no hay comisiones
  if(Object.keys(comisionesActuales).length === 0 && Object.keys(comisionesAnteriores).length === 0) {
    return (
      <section className="section">
        <h3 className="section-title">
          <IconCalendarWeek size={16}/>
          Comisiones
        </h3>
        <p className="section-text">
          No hay información sobre comisiones
        </p>
    </section>
    )
  }

  return (
    <section className="section">
      <h3 className="section-title">
        <IconCalendarWeek size={16}/>
        Comisiones
      </h3>
      <div className="materia-comisiones-container">
        <div>
          <h4 className="materia-comisiones-title">
            {anioActual} {cuatrimestreActual}º Cuatrimestre - En curso
          </h4>
          <ul className="materia-comisiones-list">
            {
              comisionesActuales.length > 0
                ? comisionesActuales.map(comision => <Comision comision={comision} key={comision.id}/>)
                : <p className="section-text">No hay comisiones en este periodo</p>
            }
          </ul>
        </div>
        <div>
          <h4 className="materia-comisiones-title">
            {anioAnterior} {cuatrimestreAnterior}º Cuatrimestre - Cuatrimestre anterior
          </h4>
          <ul className="materia-comisiones-list">
            {
              comisionesAnteriores.length > 0
                ? comisionesAnteriores.map(comision => <Comision comision={comision} key={comision.id}/>)
                : <p className="section-text">No hay comisiones en este periodo</p>
            }
          </ul>
        </div>      
      </div>
    </section>
  )
}

const CarrerasSection = ({ planEstudio }) => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBuilding size={16}/>
        Carreras
      </h3>
      <ul className="materia-carreras-container">
        {
          planEstudio.map(pe => (
            <li className="materia-carrera-item" key={pe.carrera.id}>
              <Link to={`/carrera/${pe.carrera.id}`} className="materia-carrera-nombre">
                { pe.carrera.nombre }
              </Link>
              <div className="materia-carrera-badges-container">
                <p className="badge">
                  { pe.anio }º Año 
                </p>
                <p className="badge">
                  {pe.cuatrimestre}º Cuatrimestre
                </p>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
} 

const BadgesContainer = ({materia}) => {
  return (
    <div className="materia-badge-container">
      {
        materia?.cuatrimestreDictado.length > 0
        && (
          <p className="badge">
            <IconCalendarCheck size={14}/>
            {
              materia?.cuatrimestreDictado.length === 2
                ? "1º y 2º Cuatrimestre"
                : `${materia.cuatrimestreDictado[0]}º Cuatrimestre`             
            }
          </p>
        )
      }
      
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
      className="card materia-profesor-card"
      to={`/profesor/${profesor.id}`}
    >
      <div className="materia-profesor-avatar">
        {profesor.siglas}
      </div>
      <div className="materia-profesor-info">
        <h4 className="materia-profesor-nombre">
          {profesor.apellido}, {profesor.nombre}
        </h4>
        <p className="materia-profesor-email">
          {profesor.email}
        </p>
      </div>
      <div className="materia-profesor-puntuacion">
        <p>
          {profesor.promedioPuntuaciones || "-"}
        </p>
        <Rating size="small" readOnly defaultValue={profesor.promedioPuntuaciones}/>
      </div>
    </Link>
  )
}

const Comision = ({comision}) => {
  // Formatear a 'capitalize'
  const modalidad = comision.modalidad.slice(0,1) + comision.modalidad.toLowerCase().slice(1)
  return (
    <li className="materia-comision-container card">
      <header className="materia-comision-header">
        <h4 className="materia-comision-numero">
          Comisión {comision.numero !== 0 ? comision.numero : 'única'}
        </h4>
        {
          (comision.salon.tipo && comision.salon.numero)
            && (
              <p className="badge">
                {comision.salon.tipo === "AULA" ? "AULA" : "LAB"} {comision.salon.numero}
              </p>
            )
        }
      </header>
      <p className="materia-comision-modalidad">
        {modalidad}
      </p>
      <ul className="materia-comision-horarios">
        {
          comision.horarios?.map((horario, index) => {
            return (
              <li className="materia-comision-horario" key={index}>
                <p className="materia-comision-dia">{horario.dia}</p>
                <p>{horario.horaInicio} - {horario.horaFin}</p>
              </li>
            )
          })
        }
      </ul>
    </li>
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
          <ComisionesSection comisionesActuales={materia.comisionesActuales} comisionesAnteriores={materia.comisionesAnteriores}/>
          <CarrerasSection planEstudio={materia.planEstudio}/>
        </main>
      </section>
    </main>
  );
};

export default Materia;
