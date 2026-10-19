import { Producto } from '../../producto/Entidades/entidades';

export interface ActualizarCarritoDto {
  idUsuario: number;
  idCarrito: number;
  productos?: Producto[];
  total?: number;
}
