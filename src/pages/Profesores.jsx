import { SearchLayout } from "../components/SearchLayout";
import { useSearch } from "../hooks/useSearch";
import { useProfesores } from "../hooks/useProfesores";
import { useNavigate } from "react-router-dom";
import { ProfesoresSkeleton } from "../skeletons/ProfesoresSkeleton";

const ProfesorCard = ({ profesor, navigate, style }) => {
  return (
    <li 
      key={profesor.id}
      className="profesor-card"
      onClick={() => navigate(`/profesor/${profesor.id}`)}
      style={style}
    >
      <div className="index-profe">
        {profesor.siglas}
      </div>
      <p className="profesor-card-nombre">
        {profesor.apellido}, {profesor.nombre}
      </p>
    </li>
  )
}

export const Profesores = () => {
  const { search, limit, page, cambiarPagina, cambiarSearch, sectionRef } = useSearch()
  const { profesores, loading, nextPage } = useProfesores({search, limit, page})

  const navigate = useNavigate()

  return (
    <main className="page-content" sectionRef={sectionRef}>
      <SearchLayout
        titulo="profesores" 
        page={page}
        search={search}
        cambiarSearch={cambiarSearch}
        cambiarPagina={cambiarPagina}
        nextPage={nextPage}
      >
        {
          loading
            ? Array.from({ length: 10 }, (_, i) => <ProfesoresSkeleton key={i} />)
            : profesores.map((profesor, i) => 
              <ProfesorCard 
                navigate={navigate} 
                profesor={profesor} 
                key={profesor.id} 
                style={{ '--index': i + 1 }}
              />
            )
        }
      </SearchLayout>
    </main>
  )
}

export default Profesores