import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PerfilLayout() {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <Sidebar />
            <main className="perfil-main-content" style={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}