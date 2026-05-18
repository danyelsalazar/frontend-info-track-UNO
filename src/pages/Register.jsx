import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    carrera: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Registro de Alumno</h2>
        <p className="login-subtitle">
          Completá tus datos para crear una cuenta
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          {/* SELECT CARRERA */}
          <select
            name="carrera"
            value={form.carrera}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Seleccionar carrera</option>
            <option value="programacion">Licenciatura informatica</option>
            <option value="diseno">Tecnicatura en tecnologias web</option>
            <option value="marketing">Tecnicatura en Redes Informáticas</option>
            <option value="administracion">Analista de Sistemas</option>
          </select>

          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </form>
        <p className="forgot">
          ¿Ya tenés cuenta?{" "}
          <span
            style={{ color: "var(--color-dark)", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Iniciá sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
