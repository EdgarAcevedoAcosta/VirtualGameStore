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
export type EstadoActivoUsuario = 'activo' | 'inactivo';
export type rolUsuario = 'admin' | 'cliente';
