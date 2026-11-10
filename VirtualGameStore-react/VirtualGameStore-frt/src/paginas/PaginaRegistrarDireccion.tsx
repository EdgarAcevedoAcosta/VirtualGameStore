import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { mensajeDeError } from "../servicios/api";
import { useSesion } from "../sesion/SesionContext";

interface Aviso {
  tipo: "exito" | "error";
  mensaje: string;
}
export default function PaginaRegistrarDireccion() {
  const navegar = useNavigate();
  const { usuario } = useSesion();
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const desde = (useLocation().state as { desde?: string } | null)?.desde ?? "/direcciones";
  const [calle, setCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  /* */
  async function registrarDireccion(idUsuario: number) {
    if (!usuario) {
      setAviso({ tipo: "error", mensaje: "Necesitas Iniciar sesion para registrar una direccion" });
      return;
    }
  }

  async function enviarFormulario(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      await registrarDireccion(1);
      navegar(desde);
    } catch (error) {
      setError(mensajeDeError(error, "No se pudo crear la direccion"));
    } finally {
      setEnviando(false);
    }
  }
  return (
    <>
      <form className="formulario" onSubmit={enviarFormulario}>
        <h1>Entrar</h1>
        {error && <p className="aviso aviso--error">{error}</p>}
        <p className="aviso aviso--error">Credenciales inválidas</p>

        <label className="campo">
          <span className="campo__etiqueta">Calle</span>
          <input
            className="campo__control"
            type="email"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </label>

        <label className="campo">
          <span className="campo__etiqueta">Ciudad</span>
          <input
            className="campo__control"
            type="password"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </label>

        <label className="campo">
          <span className="campo__etiqueta">Pais</span>
          <input
            className="campo__control"
            type="password"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </label>
        <label className="campo">
          <span className="campo__etiqueta">Codigo Postal</span>
          <input
            className="campo__control"
            type="password"
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />
        </label>

        <button className="boton boton--ancho" type="submit" disabled={enviando}>
          {enviando ? "Buscando..." : "Registrar Direccion"}
        </button>
        <p className="formulario__pie">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </>
  );
}
