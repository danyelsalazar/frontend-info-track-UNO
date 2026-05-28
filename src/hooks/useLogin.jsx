import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/usuario.mutations";

export const useLogin = () => {
  const navigate = useNavigate();

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

  const [loguearUsuario, {loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {loguearUsuario: accessToken} = data
      localStorage.setItem('accessToken', accessToken)
      navigate('/dashboard')
    }
  })

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    navigate
  }
}