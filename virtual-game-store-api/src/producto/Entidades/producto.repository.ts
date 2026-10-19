import { ActualizarProductoDto } from '../dto/actualizar-produto';
import { CrearProductoDto } from '../dto/crear-producto';
import { Producto } from './entidades';

export interface ProductoRepository {
  listar(): Promise<Producto[]>;
  buscarPorId(idProducto: number): Promise<Producto | null>;
  crearProducto(datos: CrearProductoDto): Promise<Producto>;
  actualizarProducto(
    idProducto: number,
    datos: ActualizarProductoDto,
  ): Promise<Producto | null>;
  eliminarProducto(idProducto: number): Promise<boolean>;
}
