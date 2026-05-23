import { Route, Routes } from "react-router-dom";
import Materias from "./Materias";
import Home from "./Home"
import ScrollTopTop from "../components/ScrollTopTop";
import MateriaDetalle from "../components/MateriaDetalle";
import Login from "./Login";
import MainLayout from "../components/MainLayout";
import Register from "./Register";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <>
      <ScrollTopTop />

      <Routes>
        {/* RUTAS CON HEADER Y FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/materias/:id" element={<MateriaDetalle />} />
        </Route>

        {/* RUTA SIN HEADER NI FOOTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  );
};

export default App;
