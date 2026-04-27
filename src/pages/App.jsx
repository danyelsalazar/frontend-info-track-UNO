import Header from "../components/Header";
import InfoResum from "../components/InfoResum";
import Inicio from "../components/Inicio";
import CarrerasArea from "../components/CarrerasArea";
import CuatrimestrCurso from "../components/CuatrimestreCurso";
import Profesores from "../components/Profesores";
const App = () => {
  return (
    <>
      <Header />
      <InfoResum />

      <main>
        <Inicio/>
        <CarrerasArea/>
        <CuatrimestrCurso/>
        <Profesores/>
      </main>
     <div className="background"></div>
    </>
  );
};

export default App;
