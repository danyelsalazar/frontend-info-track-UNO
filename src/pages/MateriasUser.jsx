import "../styles/materiasUser.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Materias from "./Materias";

const MateriasUser = () => {
  // los datos del usuario con context
  const { userIdentity, loading, error } = useAuthContext();
  const { materias, carreras, puntuaciones} = userIdentity || [];

  if(loading) {
    return <p>Cargando datos del usuario...</p>;
  }
  if(error) {
    return <p>Error al cargar datos del usuario: {error.message}</p>;
  }

  console.log(materias);
  return(
    <>
      {
        materias.map(materia => (
          <div>
            <h3>{materia.materia.nombre}</h3>
          </div>
        ))
      }
    </>
  );
};

export default MateriasUser;
