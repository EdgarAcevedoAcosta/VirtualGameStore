import type { Categoria } from "../../Tipos";
import { api, type Sobre } from "../api";
// Categorias
export async function traerCategorias(): Promise<Categoria[]> {
  const respuesta = await api.get<Sobre<Categoria[]>>("/categorias");
  return respuesta.data.data;
}
export async function traerCategoria(id: number): Promise<Categoria> {
  const respuesta = await api.get<Sobre<Categoria>>(`/categorias/${id}`);
  return respuesta.data.data;
}
