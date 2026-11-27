import { Injectable } from '@nestjs/common';
import { ProductoCarritoRepository } from '../entidades/producto-carrito.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActualizarProductoCarritoDto } from '../dto/actualizar-producto-carrito';
import { AgregarProductoCarritoDto } from '../dto/agregar-producto-carrito';
import { ProductoCarrito } from '../entidades/entidades';

@Injectable()
export class ProductoCarritoPrismaRepository implements ProductoCarritoRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<ProductoCarrito[]> {
    return this.prisma.productoCarrito.findMany();
  }
  buscarPorId(idProductoCarrito: number): Promise<ProductoCarrito | null> {
    return this.prisma.productoCarrito.findUnique({
      where: { idProductoCarrito },
    });
  }
  crearProductoCarrito(
    datos: AgregarProductoCarritoDto,
  ): Promise<ProductoCarrito> {
    return this.prisma.productoCarrito.create({
      data: {
        ...datos,
      },
    });
  }
  /*
  async listarDeCliente(idCarrito: number): Promise<ProductoCarrito[]> {
    const filas = await this.prisma.productoCarrito.findMany({
      where: { idCarrito },
    });
    
    return filas.map((f) => ({
      idProductoCarrito: f.idProductoCarrito,
      idCarrito: f.idCarrito,
      idProducto: f.idProducto,
      cantidad: f.cantidad,
    }));
  }*/
  async actualizarProductoCarrito(
    idProductoCarrito: number,
    datos: ActualizarProductoCarritoDto,
  ): Promise<ProductoCarrito | null> {
    const producto = await this.prisma.productoCarrito.findUnique({
      where: { idProductoCarrito },
    });
    if (!producto) {
      return null;
    }

    return (await this.prisma.productoCarrito.update({
      where: { idProductoCarrito },
      data: datos,
    })) as ProductoCarrito;
  }
  async eliminarProductoCarrito(idProductoCarrito: number): Promise<boolean> {
    const i = this.prisma.productoCarrito.findUnique({
      where: { idProductoCarrito },
    });
    if (!i) {
      return false;
    } else {
      this.prisma.productoCarrito.delete({ where: { idProductoCarrito } });
      return true;
    }
  }
}
