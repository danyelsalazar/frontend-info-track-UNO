import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button className="btn-volver" onClick={() => navigate(-1)}>
      <IconArrowLeft size={13}/> Volver
    </button>
  )
}