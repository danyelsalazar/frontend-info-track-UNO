import { BotonLoading } from "../components/BotonLoading";
import { useCarreras } from "../hooks/useCarreras";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { loading, form, navigate, handleChange, handleSubmit } = useRegister()
  const { carreras } = useCarreras()

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
            required
            minLength={3}
            maxLength={40}
            disabled={loading}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={40}
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            maxLength={100}
            required
            disabled={loading}
          />

          {/* SELECT CARRERA */}
          <select
            name="carreraId"
            value={form.carrera}
            onChange={handleChange}
            className="select-input"
            required
          >
            <option value="">Seleccionar carrera</option>
            {
              carreras.map(carrera => (
                <option value={carrera.id} key={carrera.id}>{carrera.nombre}</option>
              ))
            }
          </select>
          
          <BotonLoading loading={loading} type="submit">
            { loading ? "Registrando" : "Registrarse"}
          </BotonLoading>
        </form>
        <p className="forgot">
          ¿Ya tenés cuenta?{" "}
          <span
            style={{ color: "var(--color-primary)", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Iniciá sesión
          </span>
        </p>
        <p className="forgot">
            <span
              style={{ cursor: "pointer"}}
              onClick={() => navigate("/")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="rgb(57, 56, 56)" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="rgb(49, 48, 48)" d="m237.2 512l265.5 265.3a32 32 0 0 1-45.4 45.4l-288-288a32 32 0 0 1 0-45.4l288-288a32 32 0 1 1 45.4 45.4z"/></svg>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Register;
