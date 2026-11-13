import { Producto } from '../../producto/Entidades/entidades';

export interface CrearCompraDto {
  idCompra?: number;
  idUsuario: number;
  idDireccion: number;
  fecha: Date;
  total: number;
  estado: string;
  idCarrito: number;
}
