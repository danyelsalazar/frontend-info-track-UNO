import '../styles/HeaderDashboard.css'

const HeaderDashboard = ()=>{
    return(
        <header className="header-dasboard">
                {/* BOTÓN CENTRAL (FUERA DEL UL) */}
                <div className="btn-header-icon-add">
                   <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#666666"  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" width="1"/></svg>
                </div>
            <nav className="nav-header-deshboard">
                <div className="nav-notch"></div>

                <ul className="items-nav-desboard">
                    <li className="item-nav-desboard-svg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932m0 10.75h-3.875a1.94 1.94 0 0 0-1.942 1.933v3.875a1.94 1.94 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942v-3.875a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942"/></svg>
                        <b>Dashboard</b>
                    </li>

                    {/* espacio visual para el botón */}
                    <li className="empty-slot"></li>

                    <li className="item-nav-desboard-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><g fill="none" stroke="#666666" strokeLinejoin="round" strokeWidth="4"><circle cx="24" cy="13" r="9"/><path d="M5 44c0-8.437 6.175-16.312 11.4-18c0 0 4.75 5.063 7.6 8.438L31.6 26c4.275.563 11.4 9.563 11.4 18"/><path strokeLinecap="round" d="M2 44h44"/></g></svg>
                        <b>Profes</b>
                    </li>
                </ul>

            </nav>
        </header>
    )
}

export default HeaderDashboard