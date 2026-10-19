import { EstadoProcucto } from '../Entidades/entidades';

//import { Categoria } from "../dominio/entidades";
export interface ActualizarProductoDto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  categoria?: number[];
  imagenUrl?: string;
  estado?: EstadoProcucto;
}
