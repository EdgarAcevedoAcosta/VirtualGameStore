import { Compra } from 'src/compra/Entidades/entidades';

export interface ActualizarDireccionDto {
  idDireccion?: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  idUsuario?: number;
  compras?: Compra[];
}
