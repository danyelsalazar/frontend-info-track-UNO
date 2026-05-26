import data from "../data/infotrack_uno_final.json";
const Profesores = () => {
  const { professors } = data;

  return (
    <section id="profesores" className="profesores">
      <div className="pre-title title-top-careras-uno container-title-secction-profes">
        <p className="title-secction-profes divisor">
          <i></i>Profesores mejor valorados
        </p>
      </div>
      <div className="container-profes container-info-carreas-area">
        {
          professors.filter(profesor=> profesor.avgRating >= 4)
          .map((profe, index) => {
          return (
            <div key={profe.id} className="card item-profesor-materia">
              <div className="descripcion-profe">
                <p className="index-profe">0{index + 1}</p>
                <div className="description-profe-departament">
                  <h4>{profe.name}</h4>
                  <p className="departament-profe">{profe.department}</p>
                </div>
              </div>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>{star <= profe.avgRating ? "★" : "☆"}</span>
                ))}
              </div>
              <div className="rating-resenias-profe">
                <p className="ratting-profe">{profe.avgRating}/5</p>
                <p className="departament-profe"> {profe.reviewCount} reseñas</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profesores;
