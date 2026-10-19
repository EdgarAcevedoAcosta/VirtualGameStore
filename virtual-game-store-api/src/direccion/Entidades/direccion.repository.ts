import { ActualizarDireccionDto } from '../dto/actualizar-direccion';
import { CrearDireccionDto } from '../dto/crear-direccion';
import { Direccion } from './entidades';

export interface DireccionRepository {
  listar(): Promise<Direccion[]>;
  buscarPorId(id: number): Promise<Direccion | null>;
  crearDireccion(datos: CrearDireccionDto): Promise<Direccion>;
  actualizarDireccion(
    id: number,
    datos: ActualizarDireccionDto,
  ): Promise<Direccion | null>;
  eliminarDireccion(id: number): Promise<boolean>;
}
