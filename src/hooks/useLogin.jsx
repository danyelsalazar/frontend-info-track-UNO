import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { useAuthContext } from '../hooks/useAuthContext'
import { LOGIN } from "../graphql/usuario.mutations";
import Swal from "sweetalert2";


export const useLogin = () => {
  const navigate = useNavigate();
  const { guardarToken, userIdentity } = useAuthContext()

  useEffect(() => {
    if(userIdentity?.id) {
      // Si está logueado entonces ir a home
      navigate('/perfil')
    }
  }, [navigate, userIdentity])
  const [loguearUsuario, {loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {loguearUsuario: accessToken} = data
      guardarToken(accessToken)
      navigate("/perfil")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await loguearUsuario({variables: form})
    }catch(err){
      // si hay algun error con el inicio le mostramos que no se rpuede acceder
      Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          width: "350px",
          showConfirmButton: false,
          timer: 2300
      });
    }
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