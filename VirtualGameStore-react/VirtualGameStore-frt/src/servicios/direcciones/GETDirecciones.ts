import type { Direccion } from "../../Tipos";
import { api, type Sobre } from "../api";

// Direcciones
export async function traerMisDirecciones(): Promise<Direccion[]> {
  const respuesta = await api.get<Sobre<Direccion[]>>("/direcciones/mia");
  return respuesta.data.data;
}
export async function traerDireccion(id: number): Promise<Direccion> {
  const respuesta = await api.get<Sobre<Direccion>>(`/direcciones/${id}`);
  return respuesta.data.data;
}
