import { useNavigate } from "react-router-dom"

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button className="btn-volver" onClick={() => navigate(-1)}>
      ← Volver
    </button>
  )
}