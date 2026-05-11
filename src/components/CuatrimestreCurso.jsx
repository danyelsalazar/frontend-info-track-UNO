import data from "../data/infotrack_data (1).json";

const CuatrimestrCurso = () => {
  const { subjects, professors, careers, currentSemester } = data;

  return (
    <section id="cuatrimestre" className="cuatrimestre-activo">
      <div className="container-title-top-cuatri">
        <div className="pre-title title-top-careras title-top-careras-cuatrimestre">
          <p className="divisor">
            <i></i>Cuatrimestre en Curso
          </p>

          <p className="description-cuatri-active-top">
            <svg width="8" height="8" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="5" fill="#70cc14" />
            </svg>
            En curso
          </p>

          <p>{currentSemester.label}</p>
        </div>
      </div>
      <div className="container-info-carreas-area container-info-carreas-area-cuatrimestre-activo">
        {currentSemester.offerings.map((offer) => {
          
          // buscar materia
          const materia = subjects.find(
            (s) => s.id === offer.subjectId
          );

          // buscamos carrera
          const carrera = careers.find(
            (c) => c.id === offer.careerId
          );

          // bususcar profesores
          const profesoresDeMateria = professors.filter((p) =>
            offer.professorIds.includes(p.id)
          );

          return (
            <div
              className="card container-materia-en-curso"
              key={offer.subjectId}
            >
              <div className="title-materia-en-curso-cuatrimestre">
                <h3 className="title-materia-curso">
                  {materia?.name}
                </h3>
                <p className="materia-code">
                  {materia?.code}
                </p>
              </div>

              <p className="carrera-cuatri-activo-materia">
                {carrera?.shortName} {materia?.year} año
              </p>

              {/* info del offering */}
              <p className="schedule">
                {offer.schedule} · {offer.classroom}
              </p>

              <ul className="list-profesores-materia-cuatrimestre">
                {profesoresDeMateria.map((profesor) => (
                  <li
                    className="item-list-materia-curso-pro"
                    key={profesor.id}
                  >
                    <b className="profe-initials">
                      {profesor.initials}
                    </b>{" "}
                    {profesor.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CuatrimestrCurso;