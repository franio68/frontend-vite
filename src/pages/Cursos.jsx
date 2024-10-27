import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Buscar from "./Buscar";

const Cursos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      // Si existe algo que recuperar y dentro de lo recuperado existe la propiedad token
      console.log(datosRecuperar.token);
      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const gestorFormulario = async (data) => {
    console.log(extraerDatosDeUsuario());
    await axios
      .post(
        `${import.meta.env.REACT_APP_BACKEND_URL}api/cursos `,
        {
          curso: data.curso,
          docente: extraerDatosDeUsuario()[1],
          opcion: data.opcion,
          aula: data.aula,
          precio: data.precio,
          // docente: datos.userId, // del prop enviado desde App.js extraemos el userId (en datos están todos los datos del token recibido desde el servidor cuando el usuario entró en su cuenta)
        },
        {
          headers: {
            // Authorization: 'Bearer ' + datos.token, // En los headers van 'Bearer ' + token recibido
            Authorization: "Bearer " + extraerDatosDeUsuario()[0], // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="temp">
      <div className="Form">
        <div className="title">Nuevo Curso</div>
        <div className="inputs">
          <form className="formita" onSubmit={handleSubmit(gestorFormulario)}>
            <input
              type="text"
              name="curso"
              placeholder="Nombre curso"
              {...register("curso")}
            />
            {errors.nombre && <p>{errors.nombre.message}</p>}
            <input
              type="text"
              name="docente"
              placeholder="Seleccione Docente..."
              {...register("docente")}
            />
            {errors.docente && <p>{errors.docente.message}</p>}
            <input
              type="text"
              name="opcion"
              placeholder="¿On-line o Presencial?"
              {...register("opcion")}
            />
            {/* {errors.password && <p>{errors.password.message}</p>} */}
            {errors.opcion ? <p>{errors.opcion.message}</p> : null}
            {/* <input
						type='text'
						name='aula'
						placeholder='Seleccione Aula...'
						{...register('aula')}
					/> */}
            <select id="aula" {...register("Aula", { required: true })}>
              <option value="">Seleccione Aula</option>
              <option value="Aula 1">Aula 1</option>
              <option value="Aula 2">Aula 2</option>
              <option value="Aula 3">Aula 3</option>
              <option value="Aula 4">Aula 4</option>
              <option value="Aula Virtual">Aula Virtual</option>
            </select>
            {errors.aula && <p>{errors.aula.message}</p>}
            <input
              type="number"
              name="precio"
              placeholder="Precio del curso"
              {...register("precio")}
            />
            {errors.precio && <p>{errors.precio.message}</p>}
            <input type="submit" value="Crear Curso" id="submit" />
          </form>
        </div>
      </div>
      <Buscar />
    </div>
  );
};

export default Cursos;
