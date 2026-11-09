import { Link, useParams } from "react-router";
import { useProducto } from "../hooks/useProducto";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { urlImagen } from "../servicios/api";

export default function PaginaProducto() {
  const { id } = useParams();
  const { producto, cargando, error, reintentar } = useProducto(Number(id));
  if (cargando) return <Cargando />;
  if (error)
    return (
      <MensajeError
        mensaje={error ?? "Ocurrio un error al cargar el Producto"}
        onReintentar={reintentar}
      />
    );
  if (!producto)
    return (
      <MensajeError
        mensaje={error ?? "Ocurrio un error al cargar el Producto"}
        onReintentar={reintentar}
      />
    );
  return (
    <>
      <Link to="/productos" className="detalle__volver">
        ← Todos los Videojuegos
      </Link>

      <article className="detalle">
        <img
          className="detalle__imagen"
          src={urlImagen(producto.imagenUrl)}
          alt={producto.nombre}
        />
        <div className="detalle__datos">
          <span className="etiqueta etiqueta--fuerza">{producto.nombre}</span>
          <h1>{producto.nombre}</h1>
          <p className="pagina__bajada">{producto.descripcion}</p>

          {/*  Este pude ser tipo una lista de las categorias que tiene el producto
          <h2>Categorias</h2>
          <ul className="categorias">
            {producto.categorias.map((h) => (
              <li className="horario">
                <div>
                  <div className="horario__dia">
                    {h.dia} · {h.horaInicio}{" "}
                  </div>
                  <div className="horario__meta">
                    {h.entrenador} · {h.disponibles} de {h.cupoMaximo} lugares
                  </div>
                </div>
                <button className="boton boton--chico">Inscribirme</button>
              </li>
            ))}


        */}
          {/* Lo podria hacer para Comentarios, o reseñas
            <li className="horario">
              <div>
                <div className="horario__dia">viernes · 18:00</div>
                <div className="horario__meta">Ana Robles · 0 de 1 lugares</div>
              </div>
              <span className="horario__lleno">Lleno</span>
            </li>
          </ul> 
        */}
        </div>
      </article>
    </>
  );
}
