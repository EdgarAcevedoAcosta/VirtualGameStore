import { ActualizarProductoCarritoDto } from '../dto/actualizar-producto-carrito';
import { AgregarProductoCarritoDto } from '../dto/agregar-producto-carrito';
import { ProductoCarrito } from './entidades';

export interface ProductoCarritoRepository {
  listar(): Promise<ProductoCarrito[]>;
  buscarPorId(idProductoCarrito: number): Promise<ProductoCarrito | null>;
  crearProductoCarrito(
    datos: AgregarProductoCarritoDto,
  ): Promise<ProductoCarrito>;
  actualizarProductoCarrito(
    idProductoCarrito: number,
    datos: ActualizarProductoCarritoDto,
  ): Promise<ProductoCarrito | null>;
  eliminarProductoCarrito(idProductoCarrito: number): Promise<boolean>;
}
