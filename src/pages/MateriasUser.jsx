import "../styles/materiasUser.css";
import { useCarreras } from "../hooks/useCarreras";
import { useMateria } from "../hooks/useMateria";

const MateriasUser = () => {
  // obtengo el token
  const token = localStorage.getItem("accessToken");
  // 2. Dividir el token por sus puntos y tomar la segunda parte (el payload)
  const base64Url = token.split(".")[1];

  // 3. Reemplazar caracteres especiales de Base64URL a Base64 estándar
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // 4. Decodificar la cadena Base64 y convertir el texto JSON en un objeto de JS
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  // 5. Parsear el JSON para obtener el objeto con los datos del usuario
  const payload = JSON.parse(jsonPayload);

  // obtengo los datos del hook
  const { carreras, loading, error } = useCarreras();

  //Manejo el estado de carga
  if (loading) {
    return <p>Cargando carreras...</p>;
  }

  //Maneja\o el estado de error
  if (error) {
    return <p>Hubo un error al cargar las carreras: {error.message}</p>;
  }

  // obtengo las materias del usuario
  const {materiasUser} = useMateria()

  // console.log(materiasUser);
  
  return (
    <>
      <div>
        <h2>Lista de Carreras</h2>
        {carreras.length === 0 ? (
          <p>No se encontraron carreras disponibles.</p>
        ) : (
          <div className="continer-materias-user">
            {carreras.map((carrera) => (
              <>
                <h3 key={carrera.id}>
                  {carrera.nombre} (Duracion: {carrera.duracion})
                </h3>
                <div className="continer-materias-user-tarjet">
                  <div className="divisor-materia-user">
                    <div className="item-materia-user">materia 1</div>
                    <div className="item-materia-user">Materia 2</div>
                  </div>
                  <div className="add-materia-user">+Add</div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MateriasUser;
