import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./index.css";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const gestorFormulario = async (data) => {
    const result = await axios.post(
      `${import.meta.env.REACT_APP_BACKEND_URL}/api/docentes`,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(gestorFormulario)}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          {...register("nombre", {
            minLength: { value: 5, message: "Minimo 5 caracteres" },
            required: { value: true, message: "Campo requerido" },
          })}
        />
        {errors.nombre && errors.nombre.type === "minLength" && (
          <span>Campo de texto debe ser mayor de 5 caracteres</span>
        )}
        {errors.nombre && errors.nombre.type === "required" && (
          <span>Campo requerido</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Su email"
          {...register("email", {
            required: { value: true, message: "Campo requerido" },
            pattern: { value: /^\S+@\S+$/i, message: "Email invalido" },
          })}
        />
        {errors.email && errors.email.type === "pattern" && (
          <span>Email invalido</span>
        )}
        {errors.email && errors.email.type === "required" && (
          <span>Campo requerido</span>
        )}
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          {...register("password", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 8, message: "Minimo 8 caracteres" },
            maxLength: { value: 20, message: "Maximo 20 caracteres" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "La contraseña debe tener al menos  una mayúscula, una minúscula, un número y al menos un simbolo",
            },
          })}
        />
        {errors.password && errors.password.type === "minLength" && (
          <span>Mínimo 8 caracteres</span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span>Máximo 20 caracteres</span>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <span>
            La contraseña debe tener al menos una mayúscula, una minúscula, un
            número y al menos un simbolo
          </span>
        )}
        {errors.password && errors.password.type === "required" && (
          <span>Campo requerido</span>
        )}
        <label htmlFor="activo">¿Está activo?</label>
        <input
          type="checkbox"
          name="activo"
          placeholder="¿Activo?"
          {...register("checkbox", { value: true })}
        />
        <label htmlFor="submit">Acceso</label>
        <input type="submit" value="Acceso" id="submit" />
      </form>
    </div>
  );
};

export default Form;
