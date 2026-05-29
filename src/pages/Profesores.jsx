import { SearchLayout } from "../components/SearchLayout";
import { useSearch } from "../hooks/useSearch";
import { useProfesores } from "../hooks/useProfesores";
import { useNavigate } from "react-router-dom";

export const Profesores = () => {
  const { search, limit, page, cambiarPagina, cambiarSearch, sectionRef } = useSearch()
  const { profesores, loading, nextPage } = useProfesores({search, limit, page})

  const navigate = useNavigate()

  return (
    <SearchLayout
      titulo="profesores" 
      page={page}
      search={search}
      cambiarSearch={cambiarSearch}
      cambiarPagina={cambiarPagina}
      sectionRef={sectionRef}
      nextPage={nextPage}
    >
      {
        profesores.map(profesor => (
          <li 
            key={profesor.id}
            className="card profesor-item"
            onClick={() => navigate(`/profesor/${profesor.id}`)}
          >
            <div className="profe-initials">
              {profesor.siglas}
            </div>
            <p className="materia-name">
              {profesor.apellido}, {profesor.nombre}
            </p>
            
          </li>
        ))
      }
    </SearchLayout>
  )
}

export default Profesores