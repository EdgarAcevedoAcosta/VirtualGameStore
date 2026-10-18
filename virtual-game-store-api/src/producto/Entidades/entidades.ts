import { Categoria } from '../../categoria/Entidades/entidades';
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria[];
  imagenUrl?: string;
  estado: EstadoProcucto;
}
export type EstadoProcucto = 'activo' | 'inactivo';
