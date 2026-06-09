import { Skeleton } from "@mui/material"

export const MateriasSkeleton = () => {
  return (
    <li
      className="materia-item card"
    >
      <Skeleton variant="text" sx={{fontSize: "3rem"}}/>
      <Skeleton variant="rounded" height={15}/>
      <Skeleton variant="rounded" height={20}/>
    </li>
  )
}