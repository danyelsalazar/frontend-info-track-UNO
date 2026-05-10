const Inicio =()=>{
    return(
        <section className="inicio" id="inicio">
          <div className="container-inicio-texto children-block">
            <div className="pre-title">
              <p>
                <i></i>Sistema académico · Informática
              </p>
            </div>
            <div className="title-principal children-block">
              <h1>
                Seguí tu carrera. <br /> <b>Sin excusas.</b>
              </h1>
            </div>
            <div className="description-inicio">
              <p>
                Progreso, materias, profesores, tareas y comunidad. Todo lo que
                un estudiante de Informática necesita, en un solo lugar.
              </p>
            </div>
            <div className="buttons-inicio children-block">
              <button>Crear cuenta gratis</button>
              <button>
                Ver cuatrimestre
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="#faf9f5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="description-inicio-table children-block">
              <div className="childrem-description-inicio">
                <p> <b>4</b> Carreras</p>
              </div>
              <div className="childrem-description-inicio">
                <p><b>127</b> Materias</p>
              </div>
              <div className="childrem-description-inicio">
                <p><b>50+</b> Profesores</p>
              </div>
              <div className="childrem-description-inicio">
                <p><b>1000+ </b>Estudiantes</p>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Inicio