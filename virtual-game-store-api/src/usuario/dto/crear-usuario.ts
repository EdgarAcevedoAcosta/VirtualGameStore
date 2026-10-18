import { EstadoActivoUsuario, rolUsuario } from '../Entidades/entidades';
import { Direccion } from '../../direccion/Entidades/entidades';
export interface Usuario {
  idusuario: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: rolUsuario;
  direcciones?: Direccion[];
  activo: EstadoActivoUsuario;
}
