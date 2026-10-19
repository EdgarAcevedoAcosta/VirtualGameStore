export interface CrearDireccionDto {
  idDireccion: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  idUsuario?: number;
}
