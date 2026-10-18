xport interface Compra {
  idCompra: number;
  idUsuario: number;
  fecha: Date;
  total: number;
  estado: estadoProductoCompra;
  productos: ProductoCompra[];
}
export interface ProductoCompra {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}

export type estadoProductoCompra =
  'pendiente' | 'procesando' | 'enviando' | 'entregado' | 'cancelado';
