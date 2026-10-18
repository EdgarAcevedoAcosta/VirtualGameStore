import { Producto } from '../../producto/Entidades/entidades';
export interface Carrito {
  id: number;
  productos: Producto[];
  total: number;
}
