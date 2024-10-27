import React, { useState, useEffect } from "react";
import "./Buscar.css";
// import { Usuarios } from "../usuarios";
import Tabla from "../components/Tabla";
import axios from "axios";

const Buscar = () => {
  const [query, setQuery] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const recupera = async () => {
      if (query.length === 0) {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/cursos`
        ); //)
        // || axios.get(`${process.env.REACT_APP_BACKEND_URL}/docentes`);
        setDatos(res.data.cursos);
      } else {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/api/cursos/buscar/${query}`
        );
        setDatos(res.data.cursos);
      }
    };
    recupera();
  }, [query]);

  const gestorBusca = (e) => {
    setQuery(e.target.value);
  };

  const gestorTecla = (e) => {
    const tecla = e.target.value;
    console.log(datos);
  };
  return (
    <div className="searchSeccion">
      <div className="search">
        <input
          type="text"
          name="busca"
          placeholder="Buscar..."
          onChange={gestorBusca}
          onKeyDown={gestorTecla}
        />
        {/* Representa los datos en una tabla. Podemos usar cualquier componente. Por ej. un Card */}
        <Tabla datos={datos} />
      </div>
    </div>
  );
};

export default Buscar;
