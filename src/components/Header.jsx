import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // <-- Agregamos useLocation
import { useAuthContext } from "../hooks/useAuthContext";
import { Skeleton } from "@mui/material";

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
        className="item-nav button-ingresar btn-registrarse"
      >
        Registrarse
      </li>
    </>
  );
};

const BotonUsuario = ({ userIdentity }) => {
  return (
    <Link to="/perfil">
      <div className="avatar">
        {userIdentity.siglas}
      </div>
    </Link>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [esVisible, setEsVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // <-- Detecta en qué página está el usuario de forma instantánea
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
    document.addEventListener("mousedown", handleClickFuera);

    const controlarScroll = () => {
      const esPantallaInicio = location.pathname === "/" || location.search.includes("section=inicio");
      
      if (esPantallaInicio) {
        if (window.scrollY > 10) {
          setEsVisible(true);
        } else {
          setEsVisible(false);
        }
      } else {
        setEsVisible(true);
      }
    };

    controlarScroll();

    window.addEventListener("scroll", controlarScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
      window.removeEventListener("scroll", controlarScroll);
    };
  }, [location]); // <-- Escucha activamente cada vez que cambia la sección o URL

  const esPantallaInicio = location.pathname === "/" || location.search.includes("section=inicio");
  const usarTransparente = esPantallaInicio && !esVisible;

  return (
    <header
      ref={navRef}
      className={`header-fijo ${usarTransparente ? "transparent-hero" : "scrolled-white"}`}
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
              <Link to={"/carreras"} onClick={() => setOpen(false)}>
                Carreras
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
            {loading 
              ? <Skeleton variant="circular" width={"3rem"} height={"3rem"}/>
              : userIdentity?.id 
                ? (<BotonUsuario userIdentity={userIdentity} />) 
                : (<BotonesAuth setOpen={setOpen} navigate={navigate} />)
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;