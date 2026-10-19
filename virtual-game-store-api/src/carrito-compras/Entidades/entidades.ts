import { Producto } from '../../producto/Entidades/entidades';
export interface Carrito {
  idCarrito: number;
  idUsuario: number;
  productos: Producto[];
  total: number;
}
