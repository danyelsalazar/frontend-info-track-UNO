import { Skeleton } from "@mui/material"

export const CarrerasSkeleton = () => {
  return (
    <div className="card info-carrera-item">
      <header>
        <Skeleton variant="circular" width="3.5rem" height="3.5rem"/>
        <Skeleton variant="rectangular" width="450px" height="20px"/>
      </header>
      
      <div>
        <Skeleton width="200px" />
        <p className="description-carrera">
          <Skeleton width="150px"/>
        </p>
      </div>
      <span className="cta">Ver carrera →</span>
    </div>
  )
}