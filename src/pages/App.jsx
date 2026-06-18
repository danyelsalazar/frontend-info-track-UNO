import { Route, Routes } from "react-router-dom";
import Materias from "./Materias";
import Home from "./Home";
import ScrollTopTop from "../components/ScrollTopTop";
import Materia from "./Materia";
import Login from "./Login";
import MainLayout from "../components/MainLayout";
import Register from "./Register";
import Perfil from "./Perfil";
import MateriasUser from "../pages/MateriasUser";
import Profesores from "./Profesores";
import { Profesor } from "./Profesor";
import { Carrera } from "./Carrera";
import CuatrimestrCurso from "../components/CuatrimestreCurso";

const App = () => {
  return (
    <>
      <ScrollTopTop />

      <Routes>
        {/* RUTAS CON HEADER Y FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/materia/:id" element={<Materia />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/profesor/:id" element={<Profesor />} />
          <Route path="/materia/:id" element={<Materia />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/profesor/:id" element={<Profesor />} />
          <Route path="/carrera/:id" element={<Carrera />} />
          <Route path="/cuatrimestre-activo" element={<CuatrimestrCurso/>}/>
        </Route>

        {/* RUTA SIN HEADER o FOOTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/mis-materias" element={<MateriasUser/>} />
      </Routes>
    </>
  );
};

export default App;
