import { useMaterias } from "../hooks/useMaterias";

const Materias = () => {

  // TODO: Mostrar loading
  const {materias, loading, search, setSearch, page, nextPage, navigate, cambiarpagina, sectionRef} = useMaterias()

  return (
    <>
      <section ref={sectionRef} className="container-materias">
        <p className="title-secction-materias divisor">
          <i className="line-title"></i>
          Materias
        </p>

        <div className="container-input-materias">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              // al filtrar, volvemos a la página 1
              cambiarpagina(1);
            }}
            className="input-search-materia"
            placeholder="Buscar materia"
          />
        </div>

        <ul className="container-materias-list">
          {materias.map(materia => {
            return (
              <li
                key={materia.id}
                className="materia-item card"
                onClick={() => navigate(`/materias/${materia.id}`)}
              >
                <p className="materia-name">
                  {materia.nombre}
                </p>
                <div className="container-carrera-name">
                  {
                    materia.carreras.map(carrera => (
                      <p className="materia-carrera-name" key={carrera.id}>
                        {carrera.nombre}
                      </p>
                    ))
                  }
                </div>
                <div className="container-profesor-name">
                  {
                    materia.profesores.length === 0
                      ? <p className="materia-profesor-name">No hay información</p>
                      : materia.profesores.map(profesor => (
                          <p
                            key={profesor.id}
                            className="materia-profesor-name"
                          >
                            {profesor.nombre}
                          </p>
                        ))
                  }
                </div>
              </li>
            );
          })}
        </ul>

        <div className="container-btn-paginacion">
          <button
            onClick={() => cambiarpagina(page - 1)}
            disabled={page === 1}
            className="pagina-anterior"
          >
            Anterior
          </button>

          <span className="pagina-index">{page}</span>

          <button
            onClick={() => cambiarpagina(page + 1)}
            disabled={!nextPage}
            className="pagina-siguiente"
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default Materias;