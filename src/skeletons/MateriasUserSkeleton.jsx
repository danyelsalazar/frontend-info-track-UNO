import Header from "../components/Header";
import "../styles/materiasUser.css"; // Reutiliza tus estilos originales

const MateriasUserSkeleton = () => {
  const tarjetasFicticias = Array(4).fill(null);

  return (
    <div className="materias-user-container">
      <Header />
      <div className="container-sub-materias-user">
        <div className="filter-materias-user">
          <div className="container-filter-materias-user">
            
            {/* Reutilizamos las clases originales para mantener el ancho exacto de los selects */}
            <div className="select-materia-user skeleton-blink" style={{ height: "38px", border: "none" }}></div>
            <div className="select-materia-user skeleton-blink" style={{ height: "38px", border: "none" }}></div>
            <div className="select-materia-user skeleton-blink" style={{ height: "38px", border: "none" }}></div>
            <div className="select-materia-user skeleton-blink" style={{ height: "38px", border: "none" }}></div>
            
            {/* Reutilizamos la clase del botón original */}
            <div className="add-materia card skeleton-blink" style={{ height: "38px", border: "none", color: "transparent" }}>
              Agregar Materia
            </div>
          </div>
        </div>

        {/* Lista de tarjetas grises animadas */}
        <div style={{ width: "80vw" }}>
          {tarjetasFicticias.map((_, index) => (
            <div 
              key={index} 
              className="skeleton-blink"
              style={{ 
                width: "100%", 
                height: "90px",
                marginBottom: "16px", 
                borderRadius: "8px"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export {MateriasUserSkeleton};
