import { EstadoActivoUsuario, rolUsuario } from '../Entidades/entidades';
import { Direccion } from '../../direccion/Entidades/entidades';

export interface CrearUsuarioDto {
  nombre?: string;
  correo?: string;
  passwordHash?: string;
  rol: rolUsuario;
  direcciones?: Direccion[];
  activo: EstadoActivoUsuario;
}
