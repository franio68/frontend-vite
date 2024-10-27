const Tabla = ({ datos }) => {
  console.log(datos);
  return (
    <table className="tabla">
      <tbody>
        <tr>
          <th>Curso</th>
          <th>Docente</th>
          <th>Opción</th>
          <th>Aula</th>
          <th>Precio</th>
        </tr>
        {datos.map((dato) => (
          <tr key={dato._id}>
            <td>{dato.curso}</td>
            {/* {dato.docente !== null ? (
              <td>{dato.docente.nombre}</td>
            ) : (
              <td>Sin docente</td>
            )} */}
            <td>{dato.docente.nombre}</td>
            <td className="corta">{dato.opcion}</td>
            <td className="corta">{dato.aula}</td>
            <td className="corta">{dato.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
