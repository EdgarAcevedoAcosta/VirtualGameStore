export interface Usuario {
  idusuario: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: rolUsuario;
  direcciones?: Direccion[];
  activo: EstadoActivoUsuario;
}

export interface Direccion {
  idDireccion: number;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
}
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria[];
  imagenUrl?: string;
  estado: EstadoProcudto;
}
export type EstadoActivoUsuario = "activo" | "inactivo";
export type rolUsuario = "admin" | "cliente";
export type EstadoProcudto = "activo" | "inactivo";
export type estadoProductoCompra =
  | "pendiente"
  | "procesando"
  | "enviando"
  | "entregado"
  | "cancelado";
export interface Categoria {
  id: number;
  nombre: string;
}
export interface Compra {
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
export interface Carrito {
  id: number;
  productos: Producto[];
  total: number;
}
