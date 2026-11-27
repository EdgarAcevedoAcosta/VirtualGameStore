import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTO_REPOSITORY } from './producto.tokens';
import type { ProductoRepository } from './Entidades/producto.repository';
import { Producto } from './Entidades/entidades';
import { CrearProductoDto } from './dto/crear-producto';
import { ActualizarProductoDto } from './dto/actualizar-produto';

@Injectable()
export class ProductoService {
  constructor(
    @Inject(PRODUCTO_REPOSITORY)
    private readonly repo: ProductoRepository,
  ) {}

  listar(): Promise<Producto[]> {
    return this.repo.listar();
  }

  buscarPorId(idProducto: number): Promise<Producto | null> {
    return this.repo.buscarPorId(idProducto);
  }

  crearProducto(dto: CrearProductoDto): Promise<Producto> {
    return this.repo.crearProducto(dto);
  }

  actualizarProducto(
    id: number,
    dto: ActualizarProductoDto,
  ): Promise<Producto | null> {
    return this.repo.actualizarProducto(id, dto);
  }

  async eliminarProducto(id: number): Promise<boolean> {
    await this.repo.eliminarProducto(id);
    const producto = await this.repo.buscarPorId(id);
    return producto == null;
  }
}
