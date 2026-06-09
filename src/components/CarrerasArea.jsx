import { Link } from "react-router-dom";
import data from "../data/infotrack_uno_final.json";

const CarrerasArea = () => {
  const { careers } = data;

  return (
    <section className="carreras-area" id="carreras">
      <div className="pre-title title-top-careras-uno">
        <p className="divisor">
          <i></i>Carreras del area
        </p>
      </div>

      <div className="container-info-carreas-area">
        {careers.map((carrera) => (
          <Link to={`/carrera/${carrera.id}`} className=" card info-carrera-item" key={carrera.id}>
            <p className="index-carrera">
              {/* El SVG se inyecta en su propio contenedor span */}
              <span dangerouslySetInnerHTML={{ __html: carrera.avatar }} />

            </p>
            <h3 className="title-carrera">{carrera.name}</h3>
            <p className="description-carrera">
              {carrera.type} - {carrera.durationYears} anos ·{" "}
              {carrera.totalSubjects} materias
            </p>
            <ul className="items-materias-por-carrera">
              {carrera.tags.map((tag, index) => (
                <li key={index} className="materi-carrera">
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CarrerasArea;
