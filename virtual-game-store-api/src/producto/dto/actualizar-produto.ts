import { Categoria } from 'src/categoria/Entidades/entidades';
import { EstadoProcucto } from '../Entidades/entidades';
import { ProductoCarrito } from 'src/carrito-compras/Entidades/entidades';

//import { Categoria } from "../dominio/entidades";
export interface ActualizarProductoDto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  estado: string;
  categorias?: Categoria[];
  productoCompra?: ProductoCarrito[];
}
