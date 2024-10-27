import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Alta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gestorFormulario = async (data) => {
    await axios
      .post(
        import.meta.env.REACT_APP_BACKEND_URL + "/docentes/",
        {
          nombre: data.nombre,
          email: data.email,
          password: data.password,
          activo: data.activo,
          // docente: datos.userId, // del prop enviado desde App.js extraemos el userId (en datos están todos los datos del token recibido desde el servidor cuando el usuario entró en su cuenta)
        }
        // {
        // 	headers: {
        // 		Authorization: 'Bearer ' + datos.token,
        // En los headers van 'Bearer ' + token recibido
        // 	},
        // }
      )
      .then((response) => {
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="Form">
      <h1>{import.meta.env.REACT_APP_BACKEND_URL}</h1>
      <div className="title">Crea tu cuenta</div>
      <div className="inputs">
        <form onSubmit={handleSubmit(gestorFormulario)}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            {...register(
              "nombre",
              { minLength: 5 },
              { required: true, message: "Requerido" }
            )}
          />
          {errors.nombre && errors.nombre.type === "required" && (
            <span> Campo requerido</span>
          )}
          {errors.nombre && errors.nombre.type === "minLength" && (
            <span> Debe tener al menos 5 letras</span>
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
          <div>
            <label htmlFor="checkbox" id="checkbox">
              Activo
            </label>
            <input
              type="checkbox"
              id="checkbox"
              placeholder="Activo"
              {...register("Activo")}
            />
          </div>
          <input type="submit" value="Crear" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default Alta;
