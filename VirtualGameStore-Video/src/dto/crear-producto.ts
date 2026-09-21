import { EstadoProcudto } from "../dominio/entidades";

//import { Categoria } from "../dominio/entidades";
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: number[];
  imagenUrl: string;
  estado: EstadoProcudto;
}
