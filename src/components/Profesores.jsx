import data from "../data/infotrack_uno_final.json";

const Profesores = () => {
  const { professors } = data;

  // ordenar correctamente
  const topProfes = [...professors]
    .filter(p => p.avgRating >= 4)
    .sort((a, b) => {
      if (b.avgRating !== a.avgRating) {
        return b.avgRating - a.avgRating;
      }
      return b.reviewCount - a.reviewCount;
    });

  const getBadge = (index) => {
    if (index === 0) return "🥇 Top Profesor";
    if (index === 1) return "🥈 Excelente";
    if (index === 2) return "🥉 Muy valorado";
    return null;
  };

  return (
    <section id="profesores" className="profesores">
      <div className="pre-title title-top-careras-uno container-title-secction-profes">
        <p className="title-secction-profes divisor">
          <i></i>Profesores mejor valorados
        </p>
      </div>

      <div className="container-profes container-info-carreas-area">
        {topProfes.map((profe, index) => {
          const badge = getBadge(index);

          return (
            <div key={profe.id} className="card item-profesor-materia">

              {badge && (
                <div className={`top-profesor-badge rank-${index}`}>
                  {badge}
                </div>
              )}

              <div className="descripcion-profe">
                <p className="index-profe">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="description-profe-departament">
                  <h4>{profe.name}</h4>
                  <p className="departament-profe">
                    {profe.department}
                  </p>
                </div>
              </div>

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.round(profe.avgRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <div className="rating-resenias-profe">
                <p className="ratting-profe">
                  {profe.avgRating}/5
                </p>
                <p className="departament-profe">
                  {profe.reviewCount} reseñas
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profesores;