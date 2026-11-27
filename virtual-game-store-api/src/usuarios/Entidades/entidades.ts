export interface Usuario {
  idusuario?: number;
  nombre: string;
  correo: string;
  passwordHash: string;
  rol?: string;
  activo: string;
  creadoEn?: Date;
}
export type EstadoActivoUsuario = 'activo' | 'inactivo';
export type rolUsuario = 'admin' | 'cliente';
