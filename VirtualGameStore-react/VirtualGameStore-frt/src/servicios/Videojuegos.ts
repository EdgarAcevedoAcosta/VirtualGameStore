import type { Carrito, Categoria, Producto } from "../Tipos";
import { api, type Sobre } from "./api";

export async function traerVideojuegos(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>("/productos");
  return respuesta.data.data;
}
export async function traerVideojuego(id: number): Promise<Producto> {
  const respuesta = await api.get<Sobre<Producto>>(`/productos/${id}`);
  return respuesta.data.data;
}
export async function traerCategorias(): Promise<Categoria[]> {
  const respuesta = await api.get<Sobre<Categoria[]>>("/categoria");
  return respuesta.data.data;
}
export async function traerCategoria(id: number): Promise<Categoria> {
  const respuesta = await api.get<Sobre<Categoria>>(`/categoria/${id}`);
  return respuesta.data.data;
}

// este pensarlo mejor
export async function traerMiCarrito(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>("/carrito-compras/mia");
  return respuesta.data.data;
}
