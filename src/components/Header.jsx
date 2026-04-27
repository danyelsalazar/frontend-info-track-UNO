const Header = ()=>{
    return (
        <header>
        <div className="container-logo-header">
          <div className="container-svg-logo-header">
            <svg
              className="svg-logo-header"
              width="40px"
              height="40px"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="5"
                height="5"
                rx="1"
                fill="rgb(250,249,245)"
              />
              <rect
                x="8"
                y="1"
                width="5"
                height="5"
                rx="1"
                fill="rgb(119,119,115)"
              />
              <rect
                x="1"
                y="8"
                width="5"
                height="5"
                rx="1"
                fill="rgb(119,119,115)"
              />
              <rect
                x="8"
                y="8"
                width="5"
                height="5"
                rx="1"
                fill="rgb(250,249,245)"
              />
            </svg>
          </div>
          <div className="text-logo">
            <p>InfoTrack</p>
          </div>
        </div>
        <nav className="nav-container">
          <ul>
            <li className="item-nav item-nav"><a href="">Carreras</a></li>
            <li className="item-nav item-nav"><a href="">Cuatrimestre</a></li>
            <li className="item-nav item-nav"><a href="">Profesores</a></li>
            <li className="item-nav item-nav"><a href="">Novedades</a></li>
            <li className="item-nav item-nav button-ingresar"><a href="">Ingresar</a></li>
            <li className="item-nav item-nav button-ingresar"><a href="">Registrarse</a></li>
          </ul>
        </nav>
      </header>
    )
}

export default Header