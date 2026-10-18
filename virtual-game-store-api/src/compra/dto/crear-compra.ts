import { Producto } from '../../producto/Entidades/entidades';

export interface CrearCompra {
  idUsuario: number;
  productos: Producto[];
  total: number;
  estado: string;
}
