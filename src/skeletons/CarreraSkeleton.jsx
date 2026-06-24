import { IconBuilding, IconBook2 } from "@tabler/icons-react"
import { BackButton } from "../components/BackButton"
import { Skeleton } from "@mui/material"


const HeaderSection = () => {
  return (
    <header className="materia-header section">
      <div className="materia-header-top">
        <h3 className="materia-title">
          <Skeleton width={"600px"} height={"50px"} />
          <BackButton />
        </h3>
      </div>

      <div className="materia-badge-container">
        <Skeleton width={"400px"} height={"25px"} variant="rounded"/>
      </div>
    </header>
  )
}

const InfoSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBuilding size={16} />
        Información
      </h3>

      <p className="section-text">
        <Skeleton width={"500px"}/>
      </p>
    </section>
  )
}

const PlanEstudiosSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBook2 size={16} />
        Plan de estudios
      </h3>

      <div className="materia-carreras-container">
        <Skeleton height={"400px"} variant="rectangular"/>
        <Skeleton height={"400px"} variant="rectangular"/>
      </div>
    </section>
  )
}

export const CarreraSkeleton = () => {
  return (
    <>
      <HeaderSection/>
      <main>
        <InfoSection/>
        <PlanEstudiosSection/>
      </main>
    </>
  )
}