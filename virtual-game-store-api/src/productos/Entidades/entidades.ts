import type { Categoria } from '../../categorias/Entidades/entidades';

export interface Producto {
  idProducto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;
  imagenUrl?: string;
  estado: string;
  categorias: Categoria[];
}
export type EstadoProcucto = 'activo' | 'inactivo';
