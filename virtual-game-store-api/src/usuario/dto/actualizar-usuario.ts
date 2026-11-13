import { rolUsuario, EstadoActivoUsuario } from '../Entidades/entidades';
import { Direccion } from '../../direccion/Entidades/entidades';
export interface ActualizarUsuarioDto {
  nombre?: string;
  correo?: string;
  passwordHash?: string;
  rol: rolUsuario;
  direcciones?: Direccion[];
  activo: EstadoActivoUsuario;
}
