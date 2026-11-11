import { useCategorias } from "../hooks/useCategorias";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";

export default function PaginaCategorias() {
  const { cargando, error, reintentar } = useCategorias();
  //const [genero, setGenero] = useState([]);
  //const [distribuidor, setDistribuidor] = useState("");
  /*
  const TodosGeneros = [
    "Acción",
    "Aventura",
    "Ciencia Ficción",
    "Deporte",
    "Terror",
    "Fantasía",
    "Shooter",
  ];*/
  //const DistribuidoresOpt = ["Nintendo", "RockStar", "Microsoft", "Sony"];
  return (
    <>
      <section className="pagina__encabezado">
        <h1>Catalogo de Categorias</h1>
        {/* <p className="pagina__bajada">Elige una clase para ver sus horarios e inscribirte.</p>*/}
      </section>
      {cargando && <Cargando />}
      {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
      {!cargando && !error && (
        <div className="rejilla">
          <form>
            <div className="targeta-categoria-filtro">
              <div className="targeta-categoria-filtro filtros">
                <div className=""></div>
              </div>
            </div>
          </form>
          {/* Aqui va estar la lista de videojuegos, sin categorias y con categorias 
          {productos.map((p) => (
            <Link key={p.idProducto} to={`/clases/${p.idProducto}`} className="tarjeta-clase">
              
              <div className="tarjeta-clase__cuerpo">
                <span className="etiqueta etiqueta--fuerza">{p.precio}</span>
                <span className="tarjeta-clase__titulo">{p.nombre}</span>
                <span className="tarjeta-clase__meta">{p.stock}</span>
              </div>
            </Link>
          ))}
            */}
        </div>
      )}
    </>
  );
}
