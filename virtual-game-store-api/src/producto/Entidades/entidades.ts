export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria[];
  imagenUrl: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}
