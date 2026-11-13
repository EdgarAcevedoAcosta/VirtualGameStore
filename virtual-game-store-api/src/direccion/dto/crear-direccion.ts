import { Compra } from 'src/compra/Entidades/entidades';

export interface CrearDireccionDto {
  idDireccion?: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  idUsuario: number;
  compras?: Compra[];
}
