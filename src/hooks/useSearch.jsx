import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  // estados para mantener persistencia de la paginacion y search al recargar la página
  const [searchParams, setSearchParams] = useSearchParams()

  const paginaInicial = Number(searchParams.get("page")) || 1
  const searchInicial = searchParams.get("search") || ""

  const [search, setSearch] = useState(searchInicial)
  const [page, setPage] = useState(paginaInicial)

  // referencia al contenedor principal para hacer scroll
  const sectionRef = useRef(null)

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const actualizarURL = (newPage, newSearch) => {
    setSearchParams({
      page: newPage,
      search: newSearch
    })
  }

  // guardamos los datos en la url + hacemos scroll al cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    scrollToTop()
    setPage(nuevaPagina);
    actualizarURL(nuevaPagina, search)
  }

  const cambiarSearch = (newSearch) => {
    scrollToTop()
    setSearch(newSearch)
    setPage(1)
    actualizarURL(1, newSearch)
  }

  return {
    limit: 10,
    page,
    search,
    cambiarPagina,
    cambiarSearch,
    sectionRef
  }
}