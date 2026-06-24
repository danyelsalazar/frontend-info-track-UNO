import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const BotonesAuth = ({ setOpen, navigate }) => {
  return (
    <>
      <li
        onClick={() => {
          setOpen(false);
          navigate("/login");
        }}
        className="item-nav button-ingresar"
      >
        Ingresar
      </li>
      <li
        onClick={() => {
          setOpen(false);
          navigate("/register");
        }}
        className="item-nav button-ingresar"
      >
        Registrarse
      </li>
    </>
  );
};

const BotonUsuario = ({ userIdentity }) => {
  return (
    <Link 
      to="/dashboard"
    >
      <div className="avatar">
        {userIdentity.siglas}
      </div>
    </Link>
  );
};

const Header = () => {
  // Menu abierto en mobile
  const [open, setOpen] = useState(false);
  const [esVisible, setEsVisible] = useState(false);

  const navigate = useNavigate();
  const navRef = useRef();
  const buttonRef = useRef();

  const { userIdentity, loading } = useAuthContext();

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    // abro un escuchador paran todos los click de la pagina
    document.addEventListener("mousedown", handleClickFuera);

    //controlo scroll para mostrar el header
    const controlarScroll = () => {
      // Cambia 200 por la cantidad de píxeles que tú quieras
      if (window.scrollY > 5) {
        setEsVisible(true);
      } else {
        setEsVisible(false);
      }
    };

    // Escuchar el evento de scroll del navegador
    window.addEventListener("scroll", controlarScroll);

    return () => {
      // cierro el escuchador de clicks
      document.removeEventListener("mousedown", handleClickFuera);
      // cierro el escuchador de scroll
      window.removeEventListener("scroll", controlarScroll);
    };
  }, []);

  if(loading) return null;

  return (
    <header
      ref={navRef}
      className={`header-fijo ${esVisible ? "visible" : ""}`}
    >
      <div className="header-fijo-content">
        <Link to="/" className="container-logo-header">
          <div className="container-svg-logo-header">
            <svg
              className="svg-logo-header"
              viewBox="0 0 14 14"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="1" y="1" width="5" height="5" rx="1" />
              <rect x="8" y="1" width="5" height="5" rx="1" />
              <rect x="1" y="8" width="5" height="5" rx="1" />
              <rect x="8" y="8" width="5" height="5" rx="1" />
            </svg>
          </div>
          <div className="text-logo">
            <p>InfoTrack</p>
          </div>
        </Link>

        {/* botón hamburguesa */}
        <button
          ref={buttonRef}
          className={`menu-toggle ${open ? "hamburquesa-active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className={`nav-container ${open ? "active" : ""}`}>
          <ul>
            <li className="item-nav">
              <Link to={"/?section=inicio"} onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li className="item-nav">
              <Link to={"/?section=carreras"} onClick={() => setOpen(false)}>
                Carreras
              </Link>
            </li>
            <li className="item-nav">
              <Link
                to={"/cuatrimestre-activo"}
                onClick={() => setOpen(false)}
              >
                Cuatrimestre
              </Link>
            </li>
            <li className="item-nav">
              <Link to={"/profesores"} onClick={() => setOpen(false)}>
                Profesores
              </Link>
            </li>
            <li className="item-nav">
              <Link to={"/materias"} onClick={() => setOpen(false)}>
                Materias
              </Link>
            </li>
            <li className="item-nav">
              <Link to={"/calendario"} onClick={() => setOpen(false)}>
                Calendario
              </Link>
            </li>
            {userIdentity?.id ? (
              <BotonUsuario userIdentity={userIdentity} />
            ) : (
              <BotonesAuth setOpen={setOpen} navigate={navigate} />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
