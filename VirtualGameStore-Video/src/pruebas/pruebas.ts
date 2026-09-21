import { Producto } from "../dominio/entidades";
import {
  ErrorAutenticacion,
  ErrorAutoridad,
  ErrorCarritoVacio,
  ErrorProducto,
  ErrorProductoCantidad,
  ErrorProductoInactivo,
  ErrorUsuario,
} from "../dominio/errores";
import { VirtualGameStoreRepository } from "../dominio/virtualgamestore-repository";
import { CrearCompra } from "../dto/crear-compra";

export class pruebas {
  constructor(private readonly repo: VirtualGameStoreRepository) {}
  async procesarCompra(dto: CrearCompra) {
    if (!dto.productos || dto.productos.length === 0) {
      throw new ErrorCarritoVacio();
    }

    // se valida que sea un cliente el que tiene el carrito y va a comprar
    const usuario = await this.repo.buscarUsuarioId(dto.idUsuario);
    if (!usuario) {
      throw new ErrorUsuario(dto.idUsuario);
    }
    if (usuario.rol !== "cliente") {
      throw new ErrorAutoridad();
    }

    const productosAActualizar: Producto[] = [];

    // se procesa lo que se va a comprar
    for (const item of dto.productos) {
      const producto = await this.repo.obtenerProductoPorId(item.idProducto);
      if (!producto) {
        throw new ErrorProducto(item.idProducto);
      }

      // debe estar activo
      if (!producto.estado) {
        throw new ErrorProductoInactivo();
      }

      // debe haber stock
      if (producto.stock < item.stock) {
        throw new ErrorProductoCantidad();
      }

      // se da el precio en centavos

      // se reduce el stock en base a la cantidad de copias del juego q se compro
      producto.stock -= item.stock;
      productosAActualizar.push(producto);
    }
  }
}
