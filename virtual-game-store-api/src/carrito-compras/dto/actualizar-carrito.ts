import { Compra } from 'src/compra/Entidades/entidades';
import { ProductoCarrito } from '../Entidades/entidades';

export interface ActualizarCarritoDto {
  idCarrito?: number;
  idUsuario: number;
  productosCarrito?: ProductoCarrito[];
  total: number;
  compras?: Compra[];
}
