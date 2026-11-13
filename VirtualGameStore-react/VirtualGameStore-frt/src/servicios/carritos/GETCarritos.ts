import type { Carrito } from "../../Tipos";
import { api, type Sobre } from "../api";
//Carrito Compra este pensarlo mejor
export async function traerMiCarrito(): Promise<Carrito> {
  const respuesta = await api.get<Sobre<Carrito>>("/carrito-compras/mia");
  return respuesta.data.data;
}
