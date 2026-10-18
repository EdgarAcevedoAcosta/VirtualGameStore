export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
}
export interface Carrito {
  id: number;
  productos: Producto[];
  total: number;
}
