import type { Compra } from "../../Tipos";
import { api, type Sobre } from "../api";
// Compras
export async function traerMisCompras(): Promise<Compra[]> {
  const respuesta = await api.get<Sobre<Compra[]>>("/compras/mias");
  return respuesta.data.data;
}
export async function traerCompra(id: number): Promise<Compra> {
  const respuesta = await api.get<Sobre<Compra>>(`/compras/${id}`);
  return respuesta.data.data;
}
