export interface Usuario {
  idUsuario: number;
  nombre: string;
  correo: string;
  creadoEn: Date;
  rol: string;
  activo: string;
}

export type UsuarioNuevo = Omit<Usuario, 'idUsuario'>;
export type Rol = 'admin' | 'usuario';
