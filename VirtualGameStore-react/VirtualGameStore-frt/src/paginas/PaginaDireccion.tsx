import { Link } from "react-router";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { useDirecciones } from "../estado/direcciones";

export default function PaginaDirecciones() {
  const { lista: direcciones, cargando, error, cargar: reintentar } = useDirecciones();
  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;
  return (
    <>
      <section className="pagina__encabezado">
        <h1>Mis Direcciones</h1>
        <p className="pagina__bajada">
          {direcciones.length === 0
            ? "Todavia no tienes ninguna Dirección"
            : `Tienes ${direcciones.length} direcciones creadas`}
        </p>
      </section>

      <ul className="direcciones">
        {/* Aqui implementar una tabla, calle, pais, ciudad */}
        {direcciones.map((i) => (
          <li className="direcciones">
            <div>
              <Link to={`/direcciones/${i.idDireccion}`} className="direccion_usuario">
                {i.calle}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
