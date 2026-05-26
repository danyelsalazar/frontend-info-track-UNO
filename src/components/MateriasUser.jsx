import data from "../data/infotrack_uno_final.json";
import '../styles/MateriasUser.css';

const MateriasUser = () => {
  const { careers, subjects } = data;

  const materiasPorAnio = [
      {
        materias: subjects.filter((materia) => materia.year === 1),
        anio: 1,
      },
      {
        materias: subjects.filter((materia) => materia.year === 2),
        anio: 2,
      },
      {
        materias: subjects.filter((materia) => materia.year === 3),
        anio: 3,
      },
      {
        materias: subjects.filter((materia) => materia.year === 4),
        anio: 4,
      },
];

  const carrera = careers.find(
    (carrera) => carrera.name === "Licenciatura en Informática",
  );
  return (
    <div className="container-mis-materias">
      {carrera && (
        <div className="container mis-materias-carrera">
          <p>Carrera</p>
          <h3>{carrera.name}</h3>
          <p>Titulo otorgado: {carrera.shortName}</p>
        </div>
      )}
      {carrera && (
        <div className="container-mis-materias-info-resumen">
          <div className="mis-materias-info-resum-item">
            <p>Duracion</p>
            <h5>{carrera.durationYears} Anios</h5>
          </div>
          <div className="mis-materias-info-resum-item">
            <p>Carga horaria</p>
            <h5>{carrera.totalCredits} Horas</h5>
          </div>
          <div className="mis-materias-info-resum-item">
            <p>Progreso</p>
            <h5>4/{carrera.totalSubjects}</h5>
          </div>
        </div>
      )}
      <div className="container-mis-materias-guia">
        <p className="mis-materias-guia-item">Promocionada</p>
        <p className="mis-materias-guia-item">Cursando</p>
        <p className="mis-materias-guia-item">Regularizada</p>
        <p className="mis-materias-guia-item">Aprobada</p>
        <p className="mis-materias-guia-item">Desaprobada</p>
      </div>

      <div className="container-mis-materias-anio">
        {materiasPorAnio.map((materia) => (
          <div className="container-mi-materia-year">
             <div className="mi-materia-iten-title-year">
                <p className="year-mi-materia"><b>{materia.anio}</b>{materia.anio === 1 ? "Primer" : materia.anio === 2 ? "Segundo" : materia.anio === 3 ? "Tercer" : "Cuarto" } anio</p>
                <div className="conatiner-item-mi-materia-name">

                {
                    materia.materias.map(mate=>(
                        <div className="item-mi-materi-name-item">
                            <p>{mate.name} NT</p>
                        </div>
                    ))
                }
                </div>
             </div>
            <p className="year-mi-materia">{materia.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MateriasUser;
