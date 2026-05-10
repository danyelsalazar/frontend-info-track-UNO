import data from "../data/infotrack_data (1).json";

const Novedades = () => {
  const { news } = data;
  return (
    <section id="novedades" className="section-novedades">
      <div className="pre-title title-top-careras-uno container-title-secction-profes">
        <p className="title-secction-profes">
          <i></i>Novedades
        </p>
      </div>
      <div className="container-info-carreas-area card container-novedades">
        {news.map((novedad) => {
            
          const fechaStr = novedad.date;
          const [anio, mes, dia] = fechaStr.split("-");
          const fechaObjeto = new Date(anio, mes - 1, dia);
          // nombre del mes
          const nombreMes = new Intl.DateTimeFormat("es-ES", {
            month: "long",
          }).format(fechaObjeto);


          return (
            <div key={novedad.id} className="container-novedad">
              <div className="indice-novedad">
                <p>
                  <span className="title-light title-dia">{dia}</span>{" "}
                  <i className="text-darck">{nombreMes}</i>
                </p>
              </div>
              <div className="info-novedad">
                <h3 className="title-light categoria-novedad-title">{novedad.category}</h3>
                <p className="text-darck text-novedad">{novedad.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Novedades;
