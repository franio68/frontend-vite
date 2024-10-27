import axios from "axios";
const Imagenes = () => {
  const subeImagen = (e) => {
    console.log(e.target.files);
    const imagen = e.target.files[0];

    const formImagen = new FormData();
    formImagen.append("file", imagen);
    formImagen.append("upload_preset", "h4spjwow");

    axios
      .post("https://api.cloudinary.com/v1_1/franio/image/upload", formImagen)
      .then((res) => console.log(res.data.url));
  };
  return (
    <div>
      <input type="file" name="file" id="file" onChange={subeImagen} />
    </div>
  );
};

export default Imagenes;
