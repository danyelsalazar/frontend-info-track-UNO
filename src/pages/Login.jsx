import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    console.log(form);
  };

  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        {/* LOGO / HEADER */}
        <h2 className="login-title">Acceso al sistema</h2>
        <p className="login-subtitle">Ingresá con tu cuenta para continuar</p>

        <p className="login-divider">Alumnos / Administrador</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Nombre de usuario o correo"
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

          <p className="forgot">
            ¿No tenés cuenta?{" "}
            <span
              style={{ color: "var(--color-dark)", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Registrate
            </span>
          </p>

          <button type="submit" className="btn-primary">
            Acceder
          </button>
        </form>
        <p className="forgot">
            <span
              style={{ cursor: "pointer"}}
              onClick={() => navigate("/")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="rgb(255, 255, 255)" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="rgb(255, 255, 255)" d="m237.2 512l265.5 265.3a32 32 0 0 1-45.4 45.4l-288-288a32 32 0 0 1 0-45.4l288-288a32 32 0 1 1 45.4 45.4z"/></svg>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Login;
