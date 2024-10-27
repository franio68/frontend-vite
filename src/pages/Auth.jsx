import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Auth.css";
import Card from "../components/Card";
import axios from "axios";

export default function Auth(props) {
  const { gestionarLogin } = props;
  const [tieneAcceso, setTieneAcceso] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const gestorDeModo = () => {
  // 	setTieneAcceso((prevMode) => !prevMode);
  // };

  const gestorDeCambioDeModo = () => {
    setValue("nombre", undefined);
    setValue("email", undefined);
    setValue("password", undefined);
    setTieneAcceso(!tieneAcceso);
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (!tieneAcceso) {
      await axios
        .post(import.meta.env.REACT_APP_BACKEND_URL + "/docentes/", {
          nombre: data.nombre,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log("Usuario creado");
          gestionarLogin(response.data); // enviamos a la App la respuesta del servidor, que contiene el token creado por este
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .post(import.meta.env.REACT_APP_BACKEND_URL + "/docentes/login", {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log("Login Correcto");
          console.log(response.data);
          gestionarLogin(response.data); // enviamos a la App la respuesta del servidor, que contiene el token creado por este
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Card className="authentication">
      <h2>{tieneAcceso ? "Login necesario" : "Introduzca datos de alta"}</h2>
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {!tieneAcceso && (
            <input
              type="text"
              placeholder="Nombre de Usuario."
              {...register("nombre", { required: true, message: "Requerido" })}
            />
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === "required" && (
            <span>Campo requerido</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span>Se requiere e-mail válido</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span>Se requiere contraseña</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>Mínimo de 6 caracteres</span>
          )}
        </div>

        <button type="submit">{tieneAcceso ? "ACCESO" : "ALTA"} </button>
      </form>
      <button onClick={gestorDeCambioDeModo}>
        CAMBIAR A {tieneAcceso ? "ALTA" : "ACCESO"}
      </button>
    </Card>
  );
}
