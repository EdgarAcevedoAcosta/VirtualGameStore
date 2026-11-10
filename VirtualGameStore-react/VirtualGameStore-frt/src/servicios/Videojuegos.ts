import type { Categoria, Compra, Direccion, Producto } from "../Tipos";
import { api, type Sobre } from "./api";
//Videojuegos o productos
export async function traerVideojuegos(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>("/productos");
  return respuesta.data.data;
}
export async function traerVideojuego(id: number): Promise<Producto> {
  const respuesta = await api.get<Sobre<Producto>>(`/productos/${id}`);
  return respuesta.data.data;
}
// Categorias
export async function traerCategorias(): Promise<Categoria[]> {
  const respuesta = await api.get<Sobre<Categoria[]>>("/categorias");
  return respuesta.data.data;
}
export async function traerCategoria(id: number): Promise<Categoria> {
  const respuesta = await api.get<Sobre<Categoria>>(`/categorias/${id}`);
  return respuesta.data.data;
}
// Direcciones
export async function traerMisDirecciones(): Promise<Direccion[]> {
  const respuesta = await api.get<Sobre<Direccion[]>>("/direcciones/mia");
  return respuesta.data.data;
}
export async function traerDireccion(id: number): Promise<Direccion> {
  const respuesta = await api.get<Sobre<Direccion>>(`/direcciones/${id}`);
  return respuesta.data.data;
}

//Carrito Compra este pensarlo mejor
export async function traerMiCarrito(): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>("/carrito-compras/mia");
  return respuesta.data.data;
}

// Compras
export async function traerMisCompras(): Promise<Compra[]> {
  const respuesta = await api.get<Sobre<Compra[]>>("/compras/mias");
  return respuesta.data.data;
}
export async function traerCompra(id: number): Promise<Compra> {
  const respuesta = await api.get<Sobre<Compra>>(`/compras/${id}`);
  return respuesta.data.data;
}
