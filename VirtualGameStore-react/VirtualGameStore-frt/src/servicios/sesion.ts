import type { Sesion, Usuario } from "../Tipos";
import { api, type Sobre } from "./api";

interface RespuestaToken {
  access_token: string;
  usuario: Usuario;
}

export async function iniciarSesion(correo: string, contrasena: string): Promise<Sesion> {
  const r = await api.post<Sobre<RespuestaToken>>("/auth/login", { correo, contrasena });
  return { token: r.data.data.access_token, usuario: r.data.data.usuario };
}
export async function cerrarSesion(): Promise<void> {
  await api.post("/auth/logout");
}
export async function registrarUsuario(
  correo: string,
  contrasena: string,
  nombre: string
): Promise<Sesion> {
  const r = await api.post<Sobre<RespuestaToken>>("/auth/registro", { correo, contrasena, nombre });
  return { token: r.data.data.access_token, usuario: r.data.data.usuario };
}
