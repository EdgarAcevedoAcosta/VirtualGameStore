import { ActualizarDireccionDto } from '../dto/actualizar-direccion';
import { CrearDireccionDto } from '../dto/crear-direccion';
import { Direccion } from './entidades';

export interface DireccionRepository {
  listar(): Promise<Direccion[]>;
  buscarPorId(idDireccion: number): Promise<Direccion | null>;
  crearDireccion(datos: CrearDireccionDto): Promise<Direccion>;
  actualizarDireccion(
    idDireccion: number,
    datos: ActualizarDireccionDto,
  ): Promise<Direccion | null>;
  eliminarDireccion(idDireccion: number): Promise<boolean>;
}
