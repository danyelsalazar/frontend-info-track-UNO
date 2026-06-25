import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { BotonLoading } from "../components/BotonLoading";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { loading, form, navigate, handleChange, handleSubmit } = useRegister()

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
              onClick={() => navigate(-1)}
            >
              <IconArrowNarrowLeft size={30} color="var(--color-text-muted)"/>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Register;
