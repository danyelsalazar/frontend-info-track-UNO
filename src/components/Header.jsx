import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navRef = useRef()
  const buttonRef = useRef()

  useEffect(()=>{

    const handleClickFuera = (e)=>{
      if(navRef.current && !navRef.current.contains(e.target) && !buttonRef.current.contains(e.target)){
        setOpen(false)
      }
    };
    // abro un escuchador paran todosm los click de la pagina
    document.addEventListener("mousedown", handleClickFuera);

    return()=>{
      // cierro el escuchador de clicks
          document.removeEventListener("mousedown", handleClickFuera);
    }
  },[])
  return (
    <header ref={navRef}>
      <div className="container-logo-header">
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
      </div>

      {/* botón hamburguesa */}
      <button ref={buttonRef} className={`menu-toggle ${open ? "hamburquesa-active": ""}`} onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav-container ${open ? "active" : ""}` }>
        <ul>
          <li className="item-nav">
            <a href="#carreras" onClick={() => setOpen(false)}>Carreras</a>
          </li>
          <li className="item-nav">
            <a href="#cuatrimestre" onClick={() => setOpen(false)}>Cuatrimestre</a>
          </li>
          <li className="item-nav">
            <a href="#profesores" onClick={() => setOpen(false)}>Profesores</a>
          </li>
          <li className="item-nav">
            <a href="#novedades" onClick={() => setOpen(false)}>Novedades</a>
          </li>
          <li className="item-nav button-ingresar">
            <a href="#" onClick={() => setOpen(false)}>Ingresar</a>
          </li>
          <li className="item-nav button-ingresar">
            <a href="#" onClick={() => setOpen(false)}>Registrarse</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
