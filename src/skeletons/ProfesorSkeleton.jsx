import { Skeleton } from "@mui/material";
import { BackButton } from "../components/BackButton";
import { IconBook2, IconStar } from "@tabler/icons-react";

const HeaderSection = () => {
  return (
    <header className="profesor-container-header section">
      <div className="container-data-header-profesor">
        <div className="profesor-header-logo">
          <Skeleton variant="circular" width={"3rem"} height={"3rem"}/>
          <BackButton />
        </div>
        <div className="info-header-profesor">
          <div className="profesor-header-info">
            <Skeleton width={200} height={40}/>
            <Skeleton width={180} height={20}/>
          </div>
          <div className="profesor-rating-container">
            <h2 className="profesor-rating-promedio">
              <Skeleton width={50}/>
            </h2>
            <p className="profesor-rating-cantidad">
              <Skeleton width={80}/>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

const MateriasSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconBook2 size={16} />
        Materias que dicta
      </h3>
      <Skeleton variant="rounded" height={20}/>
    </section>
  );
};

const ValoracionesSection = () => {
  return (
    <section className="section">
      <h3 className="section-title">
        <IconStar size={16} />
        Valoraciones
      </h3>
      <Skeleton variant="rounded" height={100}/>
    </section>
  )
}

export const ProfesorSkeleton = () => {
  return (
    <main className="page-content page-content-profesor">
      <div className="container-section">
        <HeaderSection/>
        <MateriasSection/>
        <ValoracionesSection/>
      </div>
    </main>
  );
};
