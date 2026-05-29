import { useMutation } from "@apollo/client/react";
import { REGISTER } from "../graphql/usuario.mutations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// para la alerte de registro
const MySwal = withReactContent(Swal);

export const useRegister = () => {
  const navigate = useNavigate();

  const [registrarUsuario, { loading, error }] = useMutation(REGISTER);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrarUsuario({ variables: form });
      // si todo sale bien con el registro avisamos que se registro
      await Swal.fire({
        title: "¡Registro exitoso!",
        text: "Tu cuenta fue creada correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
        width: "350px",
        showConfirmButton: false,
        timer: 2300
      });
      // presiona aceptar y lo mandamos al loguin
      navigate("/login");
    } catch (err) {
      // si hay algun error con el registyro le mostramos que no se registro
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

  return { loading, error, form, navigate, handleChange, handleSubmit };
};
