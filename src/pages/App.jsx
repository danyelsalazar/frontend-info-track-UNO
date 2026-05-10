import { Route, Routes } from "react-router-dom";
import Materias from "./Materias";
import Home from "./Home"
import Header from "../components/Header";
import ScrollTopTop from "../components/ScrollTopTop";

const App = () => {
  return (
    <>
      <ScrollTopTop/>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/materias" element={<Materias/>}/>
      </Routes>
    </>
  );
};

export default App;
