export interface Usuario {
  idusuario: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
  direcciones: Direccion[];
  activo: boolean;
}

export interface Direccion {
  idDireccion: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
}
