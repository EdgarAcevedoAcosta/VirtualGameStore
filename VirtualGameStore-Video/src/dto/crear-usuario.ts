import { Direccion, EstadoActivoUsuario, rolUsuario } from "../dominio/entidades";
export interface Usuario {
  idusuario: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: rolUsuario;
  direcciones: Direccion[];
  activo: EstadoActivoUsuario;
}
