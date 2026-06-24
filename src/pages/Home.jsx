import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Inicio from "../components/Inicio";
import Profesores from "../components/Profesores";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CTAFinal from "../components/CTAFinal";
import "../index.css";

const Home = () => {
  // obtengo la localizacion de mi pagina
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section) {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <main>
        <Inicio />
        <div className="container-sections-landing-page">
          <Features/>
          <HowItWorks/>
          <Profesores />
          <CTAFinal/>
        </div>
      </main>
    </>
  );
};

export default Home;
