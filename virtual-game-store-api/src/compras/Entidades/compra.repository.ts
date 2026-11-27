import { CrearCompraDatos } from '../dto/crear-compra';
import { ActualizarCompraDto } from '../dto/editar-compra';
import { Compra } from './entidades';

export interface CompraRepository {
  listar(): Promise<Compra[]>;
  buscarPorId(id: number): Promise<Compra | null>;
  crearCompra(datos: CrearCompraDatos): Promise<Compra>;
  actualizarCompra(
    idCompra: number,
    datos: ActualizarCompraDto,
  ): Promise<Compra | null>;
  eliminarCompra(id: number): Promise<boolean>;
}
