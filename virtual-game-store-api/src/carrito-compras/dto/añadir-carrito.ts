import { Producto } from '../../producto/Entidades/entidades';

export interface AnadirCarritoDto {
  idUsuario: number;
  idCarrito: number;
  productos?: Producto[];
  total?: number;
}
