import { Categoria } from './categoria';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  estado: string;
  categorias: Categoria[];
}

export type ProductoNuevo = Omit<Producto, 'idProducto' | 'categorias'> & {
  categorias: number[];
};

export interface Sobre<T> {
  data: T;
  meta: { ruta: string; duracionMs: number; timestamp: string };
}

export type EstadoProducto = 'activo' | 'inactivo';
export const ESTADOPRODUCTO: EstadoProducto[] = ['activo', 'inactivo'];

export interface CategoriaProducto extends Producto {
  categorias: Categoria[];
}

export const IMAGENES: string[] = [
  '/img/zelda-breath-of-the-wild.jpg',
  '/img/super-mario-odyssey.jpg',
  '/img/pokemon-legends-arceus.jpg',
  '/img/animal-crossing-new-horizons.jpg',
  '/img/mario-kart-8-deluxe.jpg',
  '/img/kirbyEpicYarn.jpg',
];
