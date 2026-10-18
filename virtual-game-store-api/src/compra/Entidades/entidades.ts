export interface Compra {
  idCompra: number;
  idUsuario: number;
  fecha: Date;
  total: number;
  estado: string;
  productos: ProductoCompra[];
}
export interface ProductoCompra {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}
