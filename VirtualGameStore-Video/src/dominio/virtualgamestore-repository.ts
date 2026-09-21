import { Producto, Compra, Usuario } from "./entidades";
export type NuevaCompra = Omit<Compra, "id">;

export interface VirtualGameStoreRepository {
  crearProducto(producto: Producto): Promise<Producto>;
  obtenerProductos(): Promise<Producto[]>;
  obtenerProductoPorId(id: number): Promise<Producto | null>;
  actualizarProducto(producto: Producto): Promise<Producto>;
  eliminarProducto(id: number): Promise<void>;
  desactivarProducto(id: number, activo: boolean): Promise<void>;
  buscarUsuarioId(id: number): Promise<Usuario | null>;
  anadirCarrito(idUsuario: number, idProducto: number, cantidad: number): Promise<void>;
  crearOrden(
    idUsuario: number,
    productos: Producto[],
    total: number,
    estado: string
  ): Promise<void>;
}
