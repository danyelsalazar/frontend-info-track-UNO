import { useParams } from "react-router-dom";
import data from "../data/infotrack_uno_final.json";
const MateriaDetalle = () => {
  const { subjects, professors } = data;
  const { id } = useParams();

  const materia = subjects.find((mate) => mate.id === id);

  const profesores = professors.filter((profe) =>
    profe.subjectIds.includes(materia.id),
  );

  const correlativas = subjects.filter((mate) =>
    materia.prerequisites.includes(mate.id),
  );

  return (
    <>
      <section className="container-section-materia-detalle">
        <div className="card container-materia-detalle">
          <h3 className="title-name-materia-detalle">{materia.name}</h3>
          <div className="container-info-materia-detalle-profes">
            <p className="cuatri">
              Cuatrimestre de dictado: {materia.semester}
            </p>
            <p className="cod-materia-detalle">
              <b>Código</b> {materia.code}
            </p>
            <p className="title-profes-detalle">Profesores que dictan la materia:</p>
            {profesores.map((profe) => (
              <div key={profe.id} className="info-mareria-detalle-profe">
                <p className="profe-materia-detalle">
                  <b>{profe.initials}</b> {profe.name}
                </p>
                <p className="email-profe-materia-detalle"> <b className="email-profe">Email: </b>{profe.email}</p>
              </div>
            ))}

            <ul className="list-coorrelativas">
              <h5>Correlativas:</h5>
              {correlativas.map((coorrelativa) => (
                <li key={coorrelativa.id}>{coorrelativa.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default MateriaDetalle;
