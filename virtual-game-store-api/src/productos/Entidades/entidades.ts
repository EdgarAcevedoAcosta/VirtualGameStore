export interface Producto {
  idProducto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;
  imagenUrl?: string;
  estado: string;
}
export type EstadoProcucto = 'activo' | 'inactivo';
