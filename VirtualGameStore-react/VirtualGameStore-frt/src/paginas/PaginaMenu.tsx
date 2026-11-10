import { Link } from "react-router";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { useProductos } from "../hooks/useProductos";
import { urlImagen } from "../servicios/api";

export default function PaginaMenu() {
  const { productos, cargando, error, reintentar } = useProductos();
  return (
    <>
      <section className="pagina__encabezado">
        <h1>Videojuegos</h1>
        <p className="pagina__bajada">Compra videojuegos.</p>
      </section>
      {cargando && <Cargando />}
      {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
      {!cargando && !error && (
        <div className="rejilla">
          {productos.map((p) => (
            <Link key={p.idProducto} to={`/clases/${p.idProducto}`} className="tarjeta-clase">
              <img className="tarjeta-clase__imagen" src={urlImagen(p.imagenUrl)} alt={p.nombre} />
              <div className="tarjeta-clase__cuerpo">
                <span className="etiqueta etiqueta--fuerza">{p.precio}</span>
                <span className="tarjeta-clase__titulo">{p.nombre}</span>
                <span className="tarjeta-clase__meta">{p.stock}</span>
              </div>
            </Link>
          ))}

          {/* 
          <a href="/clases/2" className="tarjeta-clase">
            <img
              className="tarjeta-clase__imagen"
              src="http://localhost:3000/img/clase-02.jpg"
              alt="Ciclismo indoor"
            />
            <div className="tarjeta-clase__cuerpo">
              <span className="etiqueta etiqueta--cardio">cardio</span>
              <span className="tarjeta-clase__titulo">Ciclismo indoor</span>
              <span className="tarjeta-clase__meta">45 min</span>
            </div>
          </a>
          */}
        </div>
      )}
    </>
  );
}
