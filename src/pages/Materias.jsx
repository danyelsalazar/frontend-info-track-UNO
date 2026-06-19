import { useNavigate } from "react-router-dom";
import { SearchLayout } from "../components/SearchLayout";
import { useMaterias } from "../hooks/useMaterias";
import { useSearch } from "../hooks/useSearch";
import { MateriasSkeleton } from "../skeletons/MateriasSkeleton";

const MateriaCard = ({materia, navigate}) => {
  return (
    <li
      className="materia-item card"
      onClick={() => navigate(`/materia/${materia.id}`)}
    >
      <p className="materia-name">
        <span>({materia.id})</span> {materia.nombre}
      </p>
    </li>
  )
}

const Materias = () => {
  // TODO: Mostrar loading
  const { search, limit, page, cambiarPagina, cambiarSearch, sectionRef } = useSearch()
  const { materias, nextPage, loading} = useMaterias({search, limit, page})

  const navigate = useNavigate()

  return (
    <main className="page-content" sectionRef={sectionRef}>
      <SearchLayout
        titulo={"materias"}
        search={search}
        page={page}
        cambiarPagina={cambiarPagina}
        cambiarSearch={cambiarSearch}
        nextPage={nextPage}
      >
        {
          loading 
            ? Array.from({ length: 10 }, (_, i) => <MateriasSkeleton key={i} />)
            : materias.map(materia => <MateriaCard key={materia.id} materia={materia} navigate={navigate} key={materia.id} />)
        }
      </SearchLayout>
    </main>
  );
};

export default Materias;