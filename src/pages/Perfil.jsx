import { useNavigate } from "react-router-dom";
import { IconAlertHexagon, IconArrowBigRight, IconBook2, IconPhone, IconSchool, IconStar } from "@tabler/icons-react";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client/react";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "../components/Header";
import "../styles/dashboard.css";
import { BackButton } from "../components/BackButton";
import { PROXIMOS_VENCIMIENTOS } from "../graphql/usuario.queries";

const AccesosDirectos = () => {
  return (
    <ul className="accesos-grid section">
      <Link className="acceso-btn card" to="/perfil/mis-carreras">
        <div className="container-icon-acceso">
          <span className="acceso-icon"><IconSchool color="#fff"/></span>
        </div>
        <span className="acceso-label">Mis Carreras</span>
      </Link>
      <Link className="acceso-btn card" to="/perfil/mis-materias">
        <div className="container-icon-acceso">
          <span className="acceso-icon"><IconBook2 color="#fff"/></span>
        </div>
        <span className="acceso-label">Mis Materias</span>
      </Link>
      <Link className="acceso-btn card" to="/perfil/mis-valoraciones">
        <div className="container-icon-acceso">
          <span className="acceso-icon"><IconStar color="#fff"/></span>
        </div>
        <span className="acceso-label">Mis Valoraciones</span>
      </Link>
    </ul>
  )
}

const ProximosVencimientosSection = () => {
  const {data: { proximosVencimientos = [] } = [], loading} = useQuery(PROXIMOS_VENCIMIENTOS)

  return (
    <section className="section">
      <h3 className="section-title">
        <IconAlertHexagon size={16}/>
        Próximos vencimientos
      </h3>
      <ul>
        {
          proximosVencimientos.map(pv => <MateriaAVencer vencimiento={pv} key={pv.materia.id}/>)
        }
      </ul>
    </section>
  )
}

const MateriaAVencer = ({vencimiento}) => {
  return (
    <li key={vencimiento.materia.id}>
      <header>
        <Link to={`/materia/${vencimiento.materia.id}`}>
          {vencimiento.materia.id} - {vencimiento.materia.nombre}
        </Link>
        <button>
          <IconPhone />
          Indicar llamado
        </button>
      </header>
      <main>
        <div>
          <strong>
            Vencimiento:
          </strong>
          <p>
            {vencimiento.vencimiento.fecha}º Fecha de {vencimiento.vencimiento.anio}
          </p>
        </div>
        <div>
          <strong>
            Llamados usados:
          </strong>
          <p>
            {vencimiento.llamadosUsados}/3
          </p>
        </div>                      
      </main>
    </li>
  )
}

export default function Dashboard() {
  const { token, userIdentity } = useAuthContext()
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  if(!userIdentity) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
      <Header />
      <main className="page-content" id="page-content-perfil">
        <div className="container-section">
          <header className="materia-header section">
            <div className="profesor-header-logo">
              <b className="siglas-profe">{userIdentity.siglas}</b>
              <h1>
                {userIdentity.nombre + " " + userIdentity.apellido}
              </h1>
              <BackButton />
            </div>
          </header>
          <AccesosDirectos/>
          <ProximosVencimientosSection />
          <section className="section">
            <h3 className="section-title">
              <IconArrowBigRight size={16}/>
              Próximas a cursar
            </h3>
          </section>
        </div>
      </main>
    </>
  );
}
