import { useNavigate } from "react-router-dom";
import { SearchLayout } from "../components/SearchLayout";
import { useMaterias } from "../hooks/useMaterias";
import { useSearch } from "../hooks/useSearch";

const Materias = () => {
  // TODO: Mostrar loading
  const { search, limit, page, cambiarPagina, cambiarSearch, sectionRef } = useSearch()
  const { materias, loading, nextPage} = useMaterias({search, limit, page})

  const navigate = useNavigate()

  return (
    <SearchLayout
      titulo={"materias"}
      search={search}
      page={page}
      cambiarPagina={cambiarPagina}
      cambiarSearch={cambiarSearch}
      sectionRef={sectionRef}
      nextPage={nextPage}
    >
      {materias.map(materia => {
        return (
          <li
            key={materia.id}
            className="materia-item card"
            onClick={() => navigate(`/materia/${materia.id}`)}
          >
            <p className="materia-name">
              {materia.nombre}
            </p>
            <div className="container-carrera-name">
              {
                materia.planEstudio?.map(pe => (
                  <p className="materia-carrera-name" key={pe.carrera.id}>
                    {pe.carrera.abreviacion}
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
                        {profesor.apellido}, {profesor.nombre}
                      </p>
                    ))
              }
            </div>
          </li>
        );
      })}
    </SearchLayout>
  );
};

export default Materias;