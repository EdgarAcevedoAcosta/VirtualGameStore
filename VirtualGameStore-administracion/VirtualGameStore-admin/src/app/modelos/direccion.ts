export interface Direccion {
  idDireccion: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  idUsuario: number;
}
export type DireccionNueva = Omit<Direccion, 'idDireccion'>;
export type Usuario = 'Un Usuario';
