import { CrearUsuarioDto } from '../dto/crear-usuario';
import { Usuario } from './entidades';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario';

export interface UsuarioRepository {
  listar(): Promise<Usuario[]>;
  buscarPorId(idusuario: number): Promise<Usuario | null>;
  crearUsuario(datos: CrearUsuarioDto): Promise<Usuario>;
  actualizarUsuario(
    idUsuario: number,
    datos: ActualizarUsuarioDto,
  ): Promise<Usuario | null>;
  eliminarUsuario(idUsuario: number): Promise<boolean>;
}
