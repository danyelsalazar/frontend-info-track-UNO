import { useState } from "react";
import data from "../data/infotrack_data (1).json";
import { useNavigate } from "react-router-dom";

const Materias = () => {
  const { subjects, careers, professors } = data;

  const [dataFilter, setdataFilter] = useState("");

  const navigate = useNavigate()

  //   funcion para generalizar palabras
  const generalizarTexto = (texto) => {
    return texto
      .trim() // Quita espacios al inicio y final
      .toLowerCase() // Todo a minúsculas
      .normalize("NFD") // Descompone los acentos
      .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
  };

  const filtradoMateria = subjects.filter((materia) =>
    generalizarTexto(materia.name.toLowerCase()).includes(
      generalizarTexto(dataFilter),
    ),
  );

  return (
    <>
      <section className="container-materias">
        <p className="title-secction-materias">
          <i className="line-title"></i>
          Materias
        </p>
        <div className="container-input-materias">
          <input
            type="text"
            onChange={(e) => {
              setdataFilter(e.target.value);
            }}
            className="input-search-materia"
            placeholder="Buscar materia"
          />
        </div>

        <ul className="container-materias-list">
          {filtradoMateria.map((materia) => {
            const carrera = careers.find(
              (carrera) => materia.careerId === carrera.id,
            );
            const profes = professors.filter((profesor) =>
              profesor.subjectIds.includes(materia.id),
            );
            return (
              <li key={materia.id} className="materia-item card" onClick={()=> navigate(`/materias/${materia.id}`)}>
                <p className="materia-name">{materia.name}</p>
                <p className="materia-carrera-name">{carrera.name}</p>
                <div className="container-profesor-name">
                  {profes.map((profe) => (
                    <p key={profe.id} className="materia-profesor-name">
                      {profe.name}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Materias;
