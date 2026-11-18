import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTO_CARRITO_REPOSITORY } from './producto-carrito.token';
import type { ProductoCarritoRepository } from './entidades/producto-carrito.repository';
import { ProductoCarrito } from './entidades/entidades';
import { AgregarProductoCarritoDto } from './dto/agregar-producto-carrito';
import { ActualizarProductoCarritoDto } from './dto/actualizar-producto-carrito';

@Injectable()
export class ProductoCarritoService {
  constructor(
    @Inject(PRODUCTO_CARRITO_REPOSITORY)
    private readonly repo: ProductoCarritoRepository,
  ) {}

  listar(): Promise<ProductoCarrito[]> {
    return this.repo.listar();
  }

  buscarPorId(idProductoCarrito: number): Promise<ProductoCarrito | null> {
    return this.repo.buscarPorId(idProductoCarrito);
  }

  crearProductoCarrito(
    dto: AgregarProductoCarritoDto,
  ): Promise<ProductoCarrito> {
    return this.repo.crearProductoCarrito(dto);
  }
  /*
  listarDeCliente(idCarrito: number): Promise<ProductoCarrito[]> {
    return this.repo.listarDeMiembro(miembroId);
  }*/

  actualizarProductoCarrito(
    idProductoCarrito: number,
    dto: ActualizarProductoCarritoDto,
  ): Promise<ProductoCarrito | null> {
    return this.repo.actualizarProductoCarrito(idProductoCarrito, dto);
  }

  async eliminarProductoCarrito(idProductoCarrito: number): Promise<boolean> {
    await this.repo.eliminarProductoCarrito(idProductoCarrito);
    const producto = await this.repo.buscarPorId(idProductoCarrito);
    return producto == null;
  }
}
