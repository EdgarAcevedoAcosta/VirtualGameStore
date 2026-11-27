import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductoRepository } from '../Entidades/producto.repository';
import { Producto } from '../Entidades/entidades';
import { ActualizarProductoDto } from '../dto/actualizar-produto';
import { CrearProductoDto } from '../dto/crear-producto';

@Injectable()
export class ProductoPrismaRepository implements ProductoRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Producto[]> {
    return this.prisma.producto.findMany({ include: { categorias: true } });
  }
  buscarPorId(idProducto: number): Promise<Producto | null> {
    return this.prisma.producto.findUnique({
      where: { idProducto },
      include: { categorias: true },
    });
  }
  crearProducto(datos: CrearProductoDto): Promise<Producto> {
    const { categorias, ...datosProducto } = datos;
    return this.prisma.producto.create({
      data: {
        ...datosProducto,
        estado: 'activo',
        categorias: {
          connect: (categorias ?? []).map((idCategoria) => ({ idCategoria })),
        },
      },
      include: { categorias: true },
    });
  }
  async actualizarProducto(
    idProducto: number,
    datos: ActualizarProductoDto,
  ): Promise<Producto | null> {
    const producto = await this.prisma.producto.findUnique({
      where: { idProducto },
    });
    if (!producto) {
      return null;
    }

    const { categorias, ...datosProducto } = datos;
    return this.prisma.producto.update({
      where: { idProducto },
      data: {
        ...datosProducto,
        ...(categorias === undefined
          ? {}
          : {
              categorias: {
                set: categorias.map((idCategoria) => ({ idCategoria })),
              },
            }),
      },
      include: { categorias: true },
    });
  }
  async eliminarProducto(idProducto: number): Promise<boolean> {
    const producto = await this.prisma.producto.findUnique({
      where: { idProducto },
    });
    if (!producto) {
      return false;
    }

    await this.prisma.producto.delete({ where: { idProducto } });
    return true;
  }
}
