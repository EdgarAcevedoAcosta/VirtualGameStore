import { Link } from "react-router";

function claseEnlace({ isActivo }: { isActivo: boolean }) {
  return isActivo ? "barra__enlace barra__enlace--activo" : "barra__enlace";
}
export function Encabezado() {
  //const {usuario, cerrarSesion} = useSesion();
  return (
    <>
      <header className="barra">
        <div className="barra__interior">
          <Link to="/" className="barra__marca">
            <img src="/logo.svg" alt="" />
            Gimnasio Titanes
          </Link>

          <nav>
            <ul className="barra__enlaces">
              <li>
                <NavLink to="/clases" className={claseEnlace}>
                  Clases
                </NavLink>
              </li>
              <li>
                <NavLink to="/mis-inscripciones" className={claseEnlace}>
                  Mis inscripciones
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
    </>
  );
}
