import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const { gestionarLogin } = props;
  const [tieneAcceso, setTieneAcceso] = useState(false);

  const gestorDeCambioDeModo = () => {
    setValue("nombre", undefined);
    // setValue('email', undefined);
    // setValue('password', undefined);
    setTieneAcceso(!tieneAcceso);
  };

  const gestorFormulario = async (data) => {
    if (!tieneAcceso) {
      await axios
        .post(import.meta.env.VITE_REACT_APP_BACKEND_URL + "api/docentes/", {
          // .post(process.env.REACT_APP_BACKEND_URL + "api/docentes/", {
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
        .post(
          import.meta.env.VITE_REACT_APP_BACKEND_URL + "api/docentes/login",
          {
            // .post(process.env.REACT_APP_BACKEND_URL + "api/docentes/login", {
            email: data.email,
            password: data.password,
          }
        )
        .then((response) => {
          console.log("Login Correcto");
          console.log(response.data);
          localStorage.setItem(
            "datosUsuario",
            JSON.stringify({
              userId: response.data.userId,
              token: response.data.token,
            })
          );
          gestionarLogin(response.data); // enviamos a la App la respuesta del servidor, que contiene el token creado por este
          navegar("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="Form">
      <div className="title">Accede a tu cuenta</div>
      <div className="inputs">
        <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
          <div>
            {!tieneAcceso && (
              <input
                type="text"
                placeholder="Nombre de Usuario."
                {...register("nombre", {
                  required: true,
                  message: "Requerido",
                })}
              />
            )}
            <input
              type="text"
              name="email"
              placeholder="email@email.com"
              {...register(
                "email",
                {
                  pattern:
                    /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                },
                { required: true, message: "Requerido" }
              )}
            />
            {errors.email && errors.email.type === "required" && (
              <span> Campo requerido</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span> Formato incorrecto</span>
            )}
          </div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
              minLength: 6,
              message: "Requerido",
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <span> Campo requerido</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>Mínimo de 6 caracteres</span>
          )}
          <button type="submit">{tieneAcceso ? "ACCESO" : "ALTA"} </button>
        </form>
        <button onClick={gestorDeCambioDeModo}>
          CAMBIAR A {tieneAcceso ? "ALTA" : "ACCESO"}
        </button>
      </div>
    </div>
  );
};

export default Login;
