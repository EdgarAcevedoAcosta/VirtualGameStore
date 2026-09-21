import { Producto } from "../dominio/entidades";

export interface CrearCompra {
  idUsuario: number;
  productos: Producto[];
  total: number;
  estado: string;
}
