import type { Categoria } from "../Tipos";
import { api } from "./api";

export async function traerCategorias(): Promise<Categoria[]> {
  const respuesta = await api.get("/categoria");
  return respuesta.data.data;
}
export async function traerCategoria(id: number): Promise<Categoria> {
  const respuesta = await api.get(`/categoria/${id}`);
  return respuesta.data.data;
}
