import React from "react";
import axios from "axios";
// import { Image } from "cloudinary-react";

const SubeMedia = () => {
  const subeImagen = (e) => {
    const imagen = e.target.files[0];

    const formImagen = new FormData();
    formImagen.append("file", imagen);
    formImagen.append("upload_preset", "ddcu4b7d");

    axios
      .post("https://api.cloudinary.com/v1_1/franio/image/upload", formImagen)
      .then((res) => console.log(res.data.url)); // ! En res.data.url está la URL que debemos guardar en la BDD
  };

  return (
    <div>
      <input type="file" name="file" id="file" onChange={subeImagen} />
      {/* <Image
				cloudName='franio'
				// ! Muestra una de las imágenes que tengo en mi colección
				publicId='http://res.cloudinary.com/franio/image/upload/v1662582217/yntlshloh545pwvwykra.jpg'
			/> */}
    </div>
  );
};

export default SubeMedia;
