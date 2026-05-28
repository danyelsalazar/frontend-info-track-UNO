import { useState, useRef } from "react";
import data from "../data/infotrack_uno_final.json";
import { useNavigate, useSearchParams } from "react-router-dom";

const Materias = () => {
  const { subjects, careers, professors } = data;

  const [dataFilter, setdataFilter] = useState("");

  const navigate = useNavigate();

  // referencia al contenedor principal para hacer scroll
  const sectionRef = useRef(null);

  //   funcion para generalizar palabras
  const generalizarTexto = (texto) => {
    return texto
      .trim() // Quita espacios al inicio y final
      .toLowerCase() // Todo a minúsculas
      .normalize("NFD") // Descompone los acentos
      .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
  };

  const filtradoMateria = subjects.filter((materia) =>
    generalizarTexto(materia.name).includes(
      generalizarTexto(dataFilter)
    )
  );

  // estados para mantener persistida la paginacion de las materias
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaInicial = Number(searchParams.get("page")) || 1;

  // guardamos los datos en la url + hacemos scroll al cambiar de página
  const cambiarpagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    setSearchParams({ page: nuevaPagina });

    // scroll al inicio del componente
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  //estados para paginacion
  const [paginaActual, setPaginaActual] = useState(paginaInicial);
  const materiasPorpagina = 5;

  const indiceUltimo = paginaActual * materiasPorpagina;
  const indicePrimero = indiceUltimo - materiasPorpagina;

  const materiasActuales = filtradoMateria.slice(
    indicePrimero,
    indiceUltimo
  );

  // calculo cuantas paginas hay
  const totalPaginas = Math.ceil(
    filtradoMateria.length / materiasPorpagina
  );

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
            value={dataFilter}
            onChange={(e) => {
              const value = e.target.value;

              setdataFilter(value);

              // al filtrar, volvemos a la página 1
              setPaginaActual(1);
              setSearchParams({ page: 1 });

              // scroll al inicio del componente
              sectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="input-search-materia"
            placeholder="Buscar materia"
          />
        </div>

        <ul className="container-materias-list">
          {materiasActuales.map((materia) => {
            const carrera = careers.find(
              (carrera) => materia.careerId === carrera.id
            );

            const profes = professors.filter((profesor) =>
              profesor.subjectIds.includes(materia.id)
            );

            return (
              <li
                key={materia.id}
                className="materia-item card"
                onClick={() => navigate(`/materias/${materia.id}`)}
              >
                <p className="materia-name">{materia.name}</p>
                <p className="materia-carrera-name">
                  {carrera?.name}
                </p>

                <div className="container-profesor-name">
                  {profes.map((profe) => (
                    <p
                      key={profe.id}
                      className="materia-profesor-name"
                    >
                      {profe.name}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="container-btn-paginacion">
          <button
            onClick={() => cambiarpagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="pagina-anterior"
          >
            Anterior
          </button>

          <span className="pagina-index">{paginaActual}</span>

          <button
            onClick={() => cambiarpagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
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