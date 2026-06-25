import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { BotonLoading } from "../components/BotonLoading";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
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
              <IconArrowNarrowLeft size={30} color="var(--color-text-muted)"/>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Login;
