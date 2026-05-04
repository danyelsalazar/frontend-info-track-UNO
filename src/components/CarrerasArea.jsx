import data from "../data/infotrack_data (1).json";

const CarrerasArea = () => {
  const { careers, subjects } = data;

  return (
    <section className="carreras-area" id="carreras">
      <div className="pre-title title-top-careras-uno">
        <p>
          <i></i>Carreras del area
        </p>
      </div>
      
      <div className="container-info-carreas-area">

        {careers.map((carrera, index) => (
          <div className="info-carrera-item" key={carrera.id}>
            <p className="index-carrera">0{index+1}</p>
            <h3 className="title-carrera">{carrera.name}</h3>
            <p className="description-carrera">{carrera.type} - {carrera.durationYears} anos · {carrera.totalSubjects} materias</p>
            <ul className="items-materias-por-carrera">
                {
                    subjects    
                        .filter(materia=>(materia.careerId === carrera.id))
                        .map(materia=>(
                            <li className="materi-carrera">{materia.name}</li>
                        ))
                }
            </ul>
          </div>

        ))}

      </div>
    </section>
  );
};

export default CarrerasArea;
