import { useMutation } from "@apollo/client/react"
import { REGISTER } from "../graphql/usuario.mutations"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const useRegister = () => {
  const navigate = useNavigate()

  // Una vez registrado el usuario mandarlo al login
  const [registrarUsuario ,{loading, error}] = useMutation(REGISTER, {
    onCompleted: () => navigate('/login')
  })

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    carreraId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrarUsuario({variables: form})
  };

  return {loading, error, form, navigate, handleChange, handleSubmit}
}