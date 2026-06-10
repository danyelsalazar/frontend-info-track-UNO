import { Skeleton } from "@mui/material"

export const ProfesoresSkeleton = () => {
  return (
    <li 
      className="profesor-card"
    >
      <Skeleton variant="circular" height={"3rem"} width={"3rem"} />
      <Skeleton variant="rounded" width={250} height={23}/>
    </li>
  )
}