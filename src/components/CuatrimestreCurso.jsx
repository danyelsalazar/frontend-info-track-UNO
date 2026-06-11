import data from "../data/infotrack_uno_final.json";

const CuatrimestrCurso = () => {
  const { subjects, professors, careers, currentSemester } = data;

  return (
    <section id="cuatrimestre" className="cuatrimestre-activo">
      <div className="container-title-top-cuatri">
        <div className="section-header">
          <p className="section-badge">CUATRIMESTRE ACTUAL</p>

          <h2>{currentSemester.label}</h2>

          <p className="section-sub cuatri-extra">
            <span className="cuatri-dot"></span>
            En curso
          </p>
        </div>
      </div>
      <div className="container-info-carreas-area container-info-carreas-area-cuatrimestre-activo">
        {currentSemester.offerings.map((offer) => {
          // buscar materia
          const materia = subjects.find((s) => s.id === offer.subjectId);

          // buscamos carrera
          const carrera = careers.find((c) => c.id === offer.careerId);

          // bususcar profesores
          const profesoresDeMateria = professors.filter((p) =>
            offer.professorIds.includes(p.id),
          );

          return (
            <div
              className="card container-materia-en-curso"
              key={offer.subjectId}
            >
              <div className="title-materia-en-curso-cuatrimestre">
                <h3 className="title-materia-curso">{materia?.name}</h3>
                <p className="materia-code">{materia?.code}</p>
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
                  <li className="item-list-materia-curso-pro" key={profesor.id}>
                    <b className="profe-initials">{profesor.initials}</b>{" "}
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
