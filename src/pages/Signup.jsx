import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gestorFormulario = (data) => {
    console.log(data);
  };

  return (
    <div className="Form">
      <div className="title">Crea tu cuenta</div>
      <div className="inputs">
        <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            {...register(
              "nombre",
              { minLength: 5 },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.nombre &&
            errors.nombre.type === "required" &&
            "Campo nombre requerido"}
          {errors.nombre &&
            errors.nombre.type === "minLength" &&
            "Longitud mínima de 5 caracteres"}
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
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.email &&
            errors.email.type === "required" &&
            "Campo email requerido"}
          {errors.email &&
            errors.email.type === "pattern" &&
            "Formato email incorrecto"}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register(
              "password",
              { minLength: 6 },
              { required: true, message: "Campo requerido" }
            )}
          />
          {errors.password &&
            errors.password.type === "required" &&
            "Campo contraseña requerido"}
          {errors.password &&
            errors.password.type === "minLength" &&
            "Longitud mínima de 6 caracteres"}
          <input type="submit" value="Crear Cuenta" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
