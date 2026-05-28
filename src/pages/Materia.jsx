import { useMateria } from "../hooks/useMateria"

const MateriaDetalle = () => {
  // TODO: Mostrar el loading
  const { materia, loading } = useMateria()

  return (
    <>
      <section className="container-section-materia-detalle">
        <div className="card container-materia-detalle">
          <h3 className="title-name-materia-detalle">{materia.nombre}</h3>
          <div className="container-info-materia-detalle-profes">
            <p className="cuatri">
              Cuatrimestre de dictado: {materia.semester}
            </p>
            <p className="cod-materia-detalle">
              <b>Código</b> {materia.id}
            </p>
            <p className="title-profes-detalle">Profesores que dictan la materia:</p>
            {materia.profesores?.map(profesor => (
              <div key={profesor.id} className="info-mareria-detalle-profe">
                <p className="profe-materia-detalle">
                  <b>{'XX'}</b> {profesor.nombre}
                </p>
                <p className="email-profe-materia-detalle"> <b className="email-profe">Email: </b>{profesor.email}</p>
              </div>
            ))}

            <ul className="list-coorrelativas">
              <h5>Correlativas:</h5>
              {materia.correlativas?.map(coorrelativa => (
                <li key={coorrelativa.id}>{coorrelativa.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default MateriaDetalle;
