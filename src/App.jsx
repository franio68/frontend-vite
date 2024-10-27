import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Inicio from "./pages/Inicio";
import Error from "./pages/Error";
import Docentes from "./pages/Docentes";
import Cursos from "./pages/Cursos";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import SubeMedia from "./components/SubeMedia";
import Formulario from "./pages/Formulario";

const App = () => {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [datos, setDatos] = useState({});
  const [token, setToken] = useState();

  // Traemos desde el componente Auth los datos del usuario enviados desde el servidor mediane esta función prop
  const gestionarLogin = (dato) => {
    setDatos(dato); // datos del usuario: email, password y token
    setTieneAcceso(true);
    // La variable que indica que está logueado se pone a true
    setToken(dato.token);
  };

  const gestionarLogout = () => {
    setTieneAcceso(false);
  };

  return (
    <div className="App">
      {/* <FormCurso/> */}

      <Router>
        <div className="navbar">
          {tieneAcceso === false ? (
            <div>
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
              <NavLink className={"navlink"} to="/login">
                Login
              </NavLink>
              <NavLink className={"navlink"} to="/signup">
                Crear Cuenta
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
              <NavLink className={"navlink"} to="/docentes">
                Docentes
              </NavLink>
              <NavLink className={"navlink"} to="/cursos">
                Cursos
              </NavLink>
              <NavLink className={"navlink"} to="/logout">
                Logout
              </NavLink>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/docentes" element={<Formulario />} />
          <Route
            path="/login"
            element={<Login gestionarLogin={gestionarLogin} />}
          />

          <Route
            path="/logout"
            element={<Logout gestionarLogout={gestionarLogout} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
      {/* <SubeMedia /> */}
    </div>
  );
};
export default App;
