import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollTopTop from "../components/ScrollTopTop";
import MainLayout from "../components/MainLayout";
import Materias from "./Materias";
import Home from "./Home";
import Materia from "./Materia";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import MateriasUser from "../pages/MateriasUser";
import Profesores from "./Profesores";
import Recursos from "./Recursos";
import { Profesor } from "./Profesor";
import { Carrera } from "./Carrera";
import { Calendario } from "./Calendario";
import { Carreras } from "./Carreras";
import { MisTareas } from "./MisTareas";
import PerfilLayout from "../components/PerfilLayout";
import {MisValoraciones} from "./MisValoraciones";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const isInStandaloneIOS = window.navigator.standalone === true;
    return standalone || isInStandaloneIOS;
  });
  const [showBanner, setShowBanner] = useState(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const isInStandaloneIOS = window.navigator.standalone === true;

    const isIOS =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (standalone || isInStandaloneIOS) return false;

    return isIOS; //solo iOS lo muestra de entrada
  });

  // detección iOS (sin state → evita warning)
  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowBanner(false);
    };

    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleClose = () => {
    localStorage.setItem("hideInstall", "true");
    setShowBanner(false);
  };

  return (
    <>
      <ScrollTopTop />

      {/* BANNER PRO */}
      {showBanner && !isInstalled && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "500px",
            background: "#0f172a",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            animation: "slideUp 0.4s ease",
          }}
        >
          {/* TEXTO */}
          <div>
            <strong>Instalar InfoTrack</strong>

            {!isIOS ? (
              <p style={{ fontSize: "12px", margin: 0, opacity: 0.8 }}>
                Accedé más rápido y usala como app
              </p>
            ) : (
              <p style={{ fontSize: "12px", margin: 0, opacity: 0.8 }}>
                En iPhone: tocá <b>Compartir</b> →{" "}
                <b>Agregar a pantalla de inicio</b>
              </p>
            )}
          </div>

          {/* BOTONES */}
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <button
              onClick={handleClose}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid #fff",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Ahora no
            </button>

            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstall}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Instalar
              </button>
            )}
          </div>
        </div>
      )}

      <Routes>
        {/* RUTAS PÚBLICAS CON SU PROPIO LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/materia/:id" element={<Materia />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/profesor/:id" element={<Profesor />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/carrera/:id" element={<Carrera />} />
          <Route path="/calendario" element={<Calendario />} />
        </Route>

        {/* AUTENTICACIÓN SUELTA */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*SECCIONES PRIVADAS DE USUARIO CON SIDEBAR */}
        <Route element={<PerfilLayout />}>
          <Route path="/perfil" element={<Dashboard />} />
          <Route path="/perfil/mis-materias" element={<MateriasUser />} />
          <Route path="/perfil/mis-tareas" element={<MisTareas />} />
          <Route path="/perfil/mis-valoraciones" element={<MisValoraciones/>}/>
          <Route path="/recursos" element={<Recursos />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
