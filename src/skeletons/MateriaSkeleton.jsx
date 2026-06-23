import { Skeleton } from "@mui/material"
import { IconBuilding, IconCalendarWeek, IconCirclePlus, IconLink, IconUsersGroup } from "@tabler/icons-react"
import { BackButton } from "../components/BackButton"

const HeaderSection = () => {
  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          <Skeleton  variant="text" sx={{ fontSize: '2rem' }} width={200}/>
          <BackButton />
        </h3>
      </div>
        <button className="materia-button-estado">
          <IconCirclePlus size={14}/>
          Indicar estado
        </button>
      <Skeleton  variant="text" sx={{ fontSize: '3rem' }}/>
    </header>
  )
}

const CorrelativasSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconLink size={16}/>
        Correlativas
      </h3>
      <Skeleton height={30}/>
    </section>
  )
}

const ProfesoresSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconUsersGroup size={16}/>
        Profesores
      </h3>
      <Skeleton variant="rounded" height={60}/>
    </section>
  )
}

const ComisionesSection = () => {
  const cuatrimestreActual = new Date().getMonth() < 7 ? 1 : 2
  const anioActual = new Date().getFullYear()
  const cuatrimestreAnterior = cuatrimestreActual === 1 ? 2 : 1
  const anioAnterior = cuatrimestreActual === 1 ? anioActual - 1 : anioActual

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
            <Skeleton variant="rounded" height={100}/>
            <Skeleton variant="rounded" height={100}/>
          </ul>
        </div>
        <div className="materia-cuatrimestre-block">
          <h4 className="materia-comisiones-title">
            {anioAnterior} {cuatrimestreAnterior}º Cuatrimestre - Cuatrimestre anterior
          </h4>
          <ul className="materia-comisiones-list">
            <Skeleton variant="rounded" height={100}/>
            <Skeleton variant="rounded" height={100}/>
          </ul>
        </div>      
      </div>
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
      <ul className="materia-carreras-container">
        <Skeleton variant="rounded" height={40}/>
        <Skeleton variant="rounded" height={40}/>
      </ul>
    </section>
  )
} 

const MateriaSkeleton = () => {
  return (
    <main className="page-content">
      <section className="container-section">
        <HeaderSection/>
        <main>
          <CorrelativasSection/>
          <ProfesoresSection/>
          <ComisionesSection/>
          <CarrerasSection/>
        </main>
      </section>
    </main>
  );
};

export default MateriaSkeleton;
