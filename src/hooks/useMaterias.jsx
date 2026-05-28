import { useQuery } from "@apollo/client/react";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MATERIAS } from "../graphql/materia.queries";

export const useMaterias = () => {
  // estados para mantener persistida la paginacion de las materias
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaInicial = Number(searchParams.get("page")) || 1;

  //estados para paginacion
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(paginaInicial);

  // referencia al contenedor principal para hacer scroll
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  // guardamos los datos en la url + hacemos scroll al cambiar de página
  const cambiarpagina = (nuevaPagina) => {
    // scroll al inicio del componente
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setPage(nuevaPagina);
    setSearchParams({ page: nuevaPagina });
  };

  // Buscar materias en graphql
  const limit = 10
  const { data: {materias = []} = {}, loading} = useQuery(MATERIAS, {
    variables: {
      search,
      page: page,
      limit
    }
  })

  const nextPage = materias.length === limit

  return {
    materias,
    loading,
    sectionRef, 
    search, 
    setSearch, 
    navigate, 
    cambiarpagina, 
    page,
    nextPage
  }
}