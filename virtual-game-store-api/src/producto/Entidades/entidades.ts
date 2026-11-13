import { ProductoCarrito } from 'src/carrito-compras/Entidades/entidades';
import { Categoria } from '../../categoria/Entidades/entidades';
export interface Producto {
  idProducto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;
  imagenUrl?: string;
  estado: string;
  categoria?: Categoria[];
  productoCompra?: ProductoCarrito[];
}
export type EstadoProcucto = 'activo' | 'inactivo';
