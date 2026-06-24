import { Link, useNavigate } from "react-router-dom";
import { IconBrandWhatsapp, IconBuilding, IconCalendarCheck, IconCalendarWeek, IconCirclePlus, IconClockHour3, IconEdit, IconLink, IconStar, IconStarOff, IconUsersGroup } from "@tabler/icons-react";
import { Rating } from "@mui/material";
import { useMateria } from "../hooks/useMateria"
import { useAuthContext } from "../hooks/useAuthContext"
import { MateriaBadge } from "../components/MateriaBadge";
import { BackButton } from "../components/BackButton";
import { EditarEstadoMateriaForm } from "../components/EditarEstadoMateriaForm"
import MateriaSkeleton from "../skeletons/MateriaSkeleton";
import { useState } from "react";

const HeaderSection = ({materia}) => {
  const [formActive, setFormActive] = useState()
  const { userIdentity } = useAuthContext()
  const navigate = useNavigate()
  let materiaUser = {materia}
  if(userIdentity) {
    materiaUser = userIdentity.materias.find(m => m.materia.id === materia.id) || {materia}
  }

  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          <b>{materia.nombre} <strong>({materia.id})</strong></b>
          <BackButton/>
        </h3>
      </div>
        {
          materiaUser?.estado
            ? (
              <button className="materia-button-estado" onClick={() => setFormActive(true)}>
                <IconEdit size={14}/>
                Modificar estado
              </button>
            )
            : (
              <button className="materia-button-estado" onClick={() => {
                console.log(userIdentity)
                !userIdentity 
                  ? navigate("/login")
                  : setFormActive(true)
              }}>
                <IconCirclePlus size={14}/>
                Indicar estado
              </button>
            )
        }
      <BadgesContainer materia={materia} materiaUser={materiaUser}/>
      <EditarEstadoMateriaForm active={formActive} setActive={setFormActive} materiaUser={materiaUser}/>
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
        <div className="materia-cuatrimestre-block">
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
        <div className="materia-cuatrimestre-block">
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
            <Link to={`/carrera/${pe.carrera.id}`} key={pe.carrera.id}>
              <li className="materia-carrera-item card" key={pe.carrera.id}>
                <p className="materia-carrera-nombre">
                  { pe.carrera.nombre }
                </p>
                <div className="materia-carrera-badges-container">
                  <p className="badge bage-carreras">
                    { pe.anio }º Año 
                  </p>
                  <p className="badge bage-carreras">
                    {pe.cuatrimestre}º Cuatrimestre
                  </p>
                </div>
              </li>
            </Link>
          ))
        }
      </ul>
    </section>
  )
} 

const BadgesContainer = ({materia, materiaUser}) => {
  return (
    <ul className="materia-badge-container">
      {
        materiaUser?.estado &&
          (
            <li className="badge badge-calendar-container">
              {materiaUser.estado?.slice(0,1) + materiaUser.estado?.toLowerCase().slice(1)}
            </li>
          )
      }
      {
        materia?.cuatrimestreDictado.length > 0
        && (
          <li className="badge badge-calendar-container">
            <IconCalendarCheck size={14}/>
            {
              materia?.cuatrimestreDictado.length === 2
                ? "1º y 2º Cuatrimestre"
                : `${materia.cuatrimestreDictado[0]}º Cuatrimestre`             
            }
          </li>
        )
      }
      <li className="badge badge-calendar-container">
        <IconClockHour3 size={14}/>
        {`${materia.cargaHorariaSemanal}hs Semanales`}
      </li>     
      {
        materia.promocion !== undefined
        && (
          <li className="badge badge-calendar-container">
            {materia.promocion 
              ? <><IconStar size={14} fill="#ffffff"/> Promocionable</>  
              : <><IconStarOff size={14} fill="#ffffff"/> No Promocionable</>
            }
          </li>
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
            <IconBrandWhatsapp size={15} color={"#fff"} fill={"#25D366"}/>
            Whatsapp
          </a>
        )
      }
    </ul>
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
  const { materia, loading} = useMateria()

  if(loading) {
    return <MateriaSkeleton />
  }

  if(!materia) {
    return (
      <p>Materia no existe</p>
    )
  }

  return (
    <main className="page-content">
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
