import { BotonLoading } from "../components/BotonLoading";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  // TODO: Mostrar error y loading
  const {form, handleChange, handleSubmit, navigate, loading} = useLogin()

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Acceso al sistema</h2>
        <p className="login-subtitle">Ingresá con tu cuenta para continuar</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Nombre de usuario o correo"
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
            required
            disabled={loading}
          />

          <p className="forgot">
            ¿No tenés cuenta?{" "}
            <span
              style={{ color: "var(--color-primary)", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Registrate
            </span>
          </p>
          <BotonLoading loading={loading} type="submit">
            {loading ? "Accediendo" : "Acceder"}
          </BotonLoading>
        </form>
        <p className="forgot">
            <span
              style={{ cursor: "pointer"}}
              onClick={() => navigate(-1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="rgb(57, 56, 56)" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="rgb(49, 48, 48)" d="m237.2 512l265.5 265.3a32 32 0 0 1-45.4 45.4l-288-288a32 32 0 0 1 0-45.4l288-288a32 32 0 1 1 45.4 45.4z"/></svg>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Login;
