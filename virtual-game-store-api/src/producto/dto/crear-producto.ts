import { Categoria } from 'src/categoria/Entidades/entidades';

//import { Categoria } from "../dominio/entidades";
export interface CrearProductoDto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  estado: string;
  categorias?: Categoria[];
}
