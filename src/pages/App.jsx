import { Route, Routes } from "react-router-dom";
import Materias from "./Materias";
import Home from "./Home";
import ScrollTopTop from "../components/ScrollTopTop";
import Materia from "./Materia";
import Login from "./Login";
import MainLayout from "../components/MainLayout";
import Register from "./Register";
import Dashboard from "./Dashboard";
import MateriasUser from "../pages/MateriasUser";
import Profesores from "./Profesores";
import { Profesor } from "./Profesor";
import { Carrera } from "./Carrera";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* RUTA SIN HEADER o FOOTER */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mis-materias" element={<MateriasUser/>} />
      </Routes>
    </>
  );
};

export default App;
