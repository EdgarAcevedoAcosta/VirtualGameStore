import { Link, useNavigate } from "react-router";
import { useSesion } from "../sesion/SesionContext";
import { useState, type FormEvent } from "react";
import { mensajeDeError } from "../servicios/api";

export default function PaginaLogin() {
  const { entrar } = useSesion();
  const navegar = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviarFormulario(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      await entrar(correo, password);
      navegar("/productos");
    } catch (error) {
      setError(mensajeDeError(error, "No se pudo Iniciar Sesion"));
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
          <span className="campo__etiqueta">Correo</span>
          <input
            className="campo__control"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>

        <label className="campo">
          <span className="campo__etiqueta">Contraseña</span>
          <input
            className="campo__control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="boton boton--ancho" type="submit" disabled={enviando}>
          {enviando ? "Entrando..." : "Iniciar Sesion"}
        </button>
        <p className="formulario__pie">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </>
  );
}
