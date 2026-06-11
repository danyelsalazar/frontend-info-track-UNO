import { Skeleton } from "@mui/material"

export const MateriasSkeleton = () => {
  return (
    <li
      className="materia-item card"
    >
      <Skeleton variant="rounded" sx={{fontSize: "2rem"}}/>
    </li>
  )
}