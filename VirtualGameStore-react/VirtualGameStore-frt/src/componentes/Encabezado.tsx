import { Link, NavLink } from "react-router";
import { useSesion } from "../sesion/SesionContext";

function claseEnlace({ isActive }: { isActive: boolean }) {
  return isActive ? "barra__enlace barra__enlace--activo" : "barra__enlace";
}
export function Encabezado() {
  const { usuario, salir } = useSesion();
  return (
    <header className="barra">
      <div className="barra__interior">
        <Link to="/" className="barra__marca">
          <img src="/logo.svg" alt="" />
          Virtual Game Store
        </Link>

        <nav>
          <ul className="barra__enlaces">
            <li>
              <NavLink to="/categorias" className={claseEnlace}>
                Catalogo de Categorias
              </NavLink>
            </li>
            <li>
              <NavLink to="/carrito" className={claseEnlace}>
                Mi Carrito
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Práctica 16: aquí va quién inició sesión y el botón Salir. */}
        <div className="barra__sesion">
          {usuario ? (
            <>
              <span className="barra_usuario">Hola, {usuario.nombre}</span>
              <button className="boton boton--secundario boton--chico" onClick={salir}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/entrar" className="boton boton--chico">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
