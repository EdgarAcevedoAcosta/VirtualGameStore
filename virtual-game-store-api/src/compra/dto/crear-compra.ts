import { Producto } from '../../producto/Entidades/entidades';

export interface CrearCompraDto {
  idUsuario: number;
  idCompra: number;
  productos: Producto[];
  total?: number;
  estado?: string;
  fecha: Date;
}
