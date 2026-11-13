import { Compra } from 'src/compra/Entidades/entidades';

export interface Carrito {
  idCarrito?: number;
  idUsuario: number;
  productosCarrito?: ProductoCarrito[];
  total: number;
  compras?: Compra[];
}
export interface ProductoCarrito {
  idProductoCarrito?: number;
  idCarrito: number;
  idProducto: number;
  cantidad: number;
}
