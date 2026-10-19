import { CrearCompraDto } from '../dto/crear-compra';
import { Compra } from './entidades';

export interface CompraRepository {
  listar(): Promise<Compra[]>;
  buscarPorId(id: number): Promise<Compra | null>;
  crearCompra(datos: CrearCompraDto): Promise<Compra>;
  eliminarCompra(id: number): Promise<boolean>;
}
