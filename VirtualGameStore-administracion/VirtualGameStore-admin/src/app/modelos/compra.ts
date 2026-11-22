export interface Compra {
  idCompra: number;
  idUsuario: number;
  idDireccion: number;
  fecha: Date;
  total: number;
  estado: string;
  idCarrito: number;
}
export type CompraNueva = Omit<Compra, 'idCompra'>;
