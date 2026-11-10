// realmente no se si los GET y el POST deben ir juntos por lo que temporalmente
//Metodos POST

import type { Direccion } from "../Tipos";
import { api, type Sobre } from "./api";

//Direccion
export async function registrarDireccion(
  calle: string,
  ciudad: string,
  codigoPostal: string,
  pais: string,
  idUsuario: number
): Promise<Direccion> {
  const r = await api.post<Sobre<Direccion>>("/direcciones", {
    calle,
    ciudad,
    codigoPostal,
    pais,
    idUsuario,
  });
  return r.data.data;
}
