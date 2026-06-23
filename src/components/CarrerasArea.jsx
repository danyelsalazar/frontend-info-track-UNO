import { Link } from "react-router-dom";
import data from "../data/infotrack_uno_final.json";

const CarrerasArea = () => {
  const { careers } = data;

  return (
    <section className="carreras-area" id="carreras">
      <div className="section-header">
        <p className="section-badge">OFERTA ACADÉMICA</p>
        <h2>Explorá las carreras disponibles</h2>
        <p className="section-sub">
          Elegí tu camino y conocé todas las materias, duración y enfoque.
        </p>
      </div>

      <div className="container-info-carreas-area">
        {careers.map((carrera) => (
          <Link
            to={`/carrera/${carrera.id}`}
            className="card info-carrera-item"
            key={carrera.id}
          >
            <p className="index-carrera">
              <span dangerouslySetInnerHTML={{ __html: carrera.avatar }} />
            </p>

            <h3 className="title-carrera">{carrera.name}</h3>

            <p className="description-carrera">
              {carrera.type} - {carrera.durationYears} años ·{" "}
              {carrera.totalSubjects} materias
            </p>

            <ul className="items-materias-por-carrera">
              {carrera.tags.map((tag, index) => (
                <li key={index} className="materi-carrera">
                  {tag}
                </li>
              ))}
            </ul>

            <span className="cta">Ver carrera →</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CarrerasArea;
