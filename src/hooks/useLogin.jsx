import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { useAuthContext } from '../hooks/useAuthContext'
import { LOGIN } from "../graphql/usuario.mutations";

export const useLogin = () => {
  const navigate = useNavigate();
  const { guardarToken, userIdentity } = useAuthContext()

  useEffect(() => {
    if(userIdentity?.id) {
      // Si está logueado entonces ir a home
      navigate('/dashboard')
    }
  }, [navigate, userIdentity])
  
  const [loguearUsuario, {loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {loguearUsuario: accessToken} = data
      guardarToken(accessToken)
      navigate("/dashboard")
    }
  })

  // Lógica de formulario
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loguearUsuario({variables: form})
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    navigate
  }
}