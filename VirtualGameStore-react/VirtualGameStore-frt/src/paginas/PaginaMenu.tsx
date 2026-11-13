import { Link } from "react-router";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { useProductos } from "../hooks/useProductos";
import { urlImagen } from "../servicios/api";
export interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}
export default function PaginaMenu() {
  const { productos, cargando, error, reintentar } = useProductos();
  const AllProductos: Producto[] = [
    {
      idProducto: 1,
      nombre: "The Legend of Zelda: Breath of the Wild",
      precio: 59.99,
      stock: 12,
      imagenUrl: "/img/zelda-breath-of-the-wild.jpg",
    },
    {
      idProducto: 2,
      nombre: "Super Mario Odyssey",
      precio: 49.99,
      stock: 8,
      imagenUrl: "/img/super-mario-odyssey.jpg",
    },
    {
      idProducto: 3,
      nombre: "Animal Crossing: New Horizons",
      precio: 54.99,
      stock: 15,
      imagenUrl: "/img/animal-crossing-new-horizons.jpg",
    },
    {
      idProducto: 4,
      nombre: "Mario Kart 8 Deluxe",
      precio: 49.99,
      stock: 6,
      imagenUrl: "/img/mario-kart-8-deluxe.jpg",
    },
    {
      idProducto: 5,
      nombre: "Metroid Dread",
      precio: 39.99,
      stock: 10,
      imagenUrl: "/img/metroid-dread.jpg",
    },
    {
      idProducto: 6,
      nombre: "Pokémon Legends: Arceus",
      precio: 44.99,
      stock: 9,
      imagenUrl: "pokemon-legends-arceus.jpg",
    },
  ];
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
      <div className="rejilla">
        {AllProductos.map((p) => (
          <Link key={p.idProducto} to={`/clases/${p.idProducto}`} className="tarjeta-clase">
            <img className="tarjeta-clase__imagen" src={urlImagen(p.imagenUrl)} alt={p.nombre} />
            <div className="tarjeta-clase__cuerpo">
              <span className="etiqueta etiqueta--fuerza">{p.precio}</span>
              <span className="tarjeta-clase__titulo">{p.nombre}</span>
              <span className="tarjeta-clase__meta">{p.stock}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
