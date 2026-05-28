import { useMutation } from "@apollo/client/react"
import { REGISTER } from "../graphql/usuario.mutations"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {
  const navigate = useNavigate()
  // Una vez registrado el usuario mandarlo al login
  const [registrarUsuario ,{data, loading, error}] = useMutation(REGISTER, {
    onCompleted: () => navigate('/login')
  })
  const register = (form) => {registrarUsuario({variables: form})}
  return {register, data, loading, error}
}