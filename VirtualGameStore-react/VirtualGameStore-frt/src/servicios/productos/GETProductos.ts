import type { Producto } from "../../Tipos";
import { api, type Sobre } from "../api";
//Videojuegos o productos
export async function traerVideojuegos(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>("/productos");
  return respuesta.data.data;
}
export async function traerVideojuego(id: number): Promise<Producto> {
  const respuesta = await api.get<Sobre<Producto>>(`/productos/${id}`);
  return respuesta.data.data;
}
 