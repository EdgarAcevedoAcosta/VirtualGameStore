import type { Producto } from "../Tipos";
import { api } from "./api";

export async function traerVideojuegos(): Promise<Producto[]> {
  const respuesta = await api.get("/productos");
  return respuesta.data.data;
}
export async function traerVideojuego(id: number): Promise<Producto> {
  const respuesta = await api.get(`/productos/${id}`);
  return respuesta.data.data;
}
