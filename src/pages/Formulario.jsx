import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Image } from "cloudinary-react";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [datosImagen, setDatosImagen] = useState();

  const subeImagen = (e) => {
    const imagen = e.target.files[0];

    const formImagen = new FormData();
    formImagen.append("file", imagen);
    formImagen.append("upload_preset", "ddcu4b7d");

    axios
      .post("https://api.cloudinary.com/v1_1/franio/image/upload", formImagen)
      .then((res) => {
        setDatosImagen(res.data.url);
        console.log(datosImagen);
      }); // ! En res.data.url está la URL que debemos guardar en la BDD
  };

  const gestorFormulario = async (data) => {
    await axios
      .post(import.meta.env.REACT_APP_BACKEND_URL + "/docentes", {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        activo: data.activo,
        foto: datosImagen,
      })
      .then((response) => {
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            {...register("nombre")}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}
          {/* o bien errors.nombre && <span>Se requiere un nombre</span> */}
          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register("password")}
          />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          {errors.password ? <p>{errors.password.message}</p> : null}
          <input
            type="text"
            name="activo"
            placeholder="¿activo?"
            {...register("activo")}
          />
          {errors.activo && <p>{errors.activo.message}</p>}

          <input
            type="file"
            name="foto"
            id="foto"
            accept="image/*"
            {...register("foto", {
              onChange: (e) => {
                subeImagen(e);
              },
            })}
          />
          {errors.foto && <p>{errors.foto.message}</p>}
          <input type="submit" value="Crear" id="submit" />
        </form>
        {/* <Image
						cloudName='franio'
						// ! Muestra una de las imágenes que tengo en mi colección
						publicId='http://res.cloudinary.com/franio/image/upload/v1662582217/yntlshloh545pwvwykra.jpg'
						/> */}
      </div>
    </div>
  );
};

export default Form;
