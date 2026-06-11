
export const SearchLayout = ({titulo, sectionRef, search, page, cambiarPagina, cambiarSearch, nextPage, children}) => {
  return (
    <div ref={sectionRef} className="container-materias">
      <p className="title-secction-materias divisor">
        <i className="line-title"></i>
        {titulo}
      </p>

      <div className="container-input-materias">
        <input
          type="text"
          value={search}
          onChange={(e) => {cambiarSearch(e.target.value)}}
          className="input-search-materia"
          placeholder={`Buscar ${titulo}`}
        />
      </div>

      <ul className="container-materias-list">
        { children }
      </ul>

      <div className="container-btn-paginacion">
        <button
          onClick={() => cambiarPagina(page - 1)}
          disabled={page === 1}
          className="pagina-anterior"
        >
          Anterior
        </button>

        <span className="pagina-index">{page}</span>

        <button
          onClick={() => cambiarPagina(page + 1)}
          disabled={!nextPage}
          className="pagina-siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}