import InfoResum from "../components/InfoResum";
import Inicio from "../components/Inicio";
import CarrerasArea from "../components/CarrerasArea";
import CuatrimestrCurso from "../components/CuatrimestreCurso";
import Profesores from "../components/Profesores";
import Novedades from "../components/Novedades";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  // obtengo la localizacion de mi pagina
  const location = useLocation();

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const section = params.get("section")

    if(section){
      const element = document.getElementById(section);

      if(element) {
        element.scrollIntoView({behavior: "smooth"})
      }
    }
  }, [location])
  
  return (
    <>
      <InfoResum />
      <main>
        <Inicio />
        <CarrerasArea />
        <CuatrimestrCurso />
        <Profesores />
        <Novedades />
      </main>
    </>
  );
};

export default Home;
