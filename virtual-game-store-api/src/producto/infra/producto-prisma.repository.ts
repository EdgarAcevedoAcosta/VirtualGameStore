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
    return this.prisma.producto.findMany();
  }
  buscarPorId(idProducto: number): Promise<Producto | null> {
    return this.prisma.producto.findUnique({ where: { idProducto } });
  }
  crearProducto(datos: CrearProductoDto): Promise<Producto> {
    return this.prisma.producto.create({
      data: {
        idProducto: datos.idProducto,
        nombre: datos.nombre,
        stock: datos.stock,
        precio: datos.precio,
        estado: datos.estado,
        imagenUrl: datos.imagenUrl,
        descripcion: datos.descripcion,
      },
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

    return this.prisma.producto.update({
      where: { idProducto },
      data: { 
        nombre: datos.nombre,
        stock: datos.stock,
        precio: datos.precio,
        estado: datos.estado,
        imagenUrl: datos.imagenUrl,
        descripcion: datos.descripcion,  
      },
    });
  }
  async eliminarProducto(idProducto: number): Promise<boolean> {
    const i = this.prisma.producto.findUnique({
      where: { idProducto },
    });
    if (!i) {
      return false;
    } else {
      this.prisma.producto.delete({ where: { idProducto } });
      return true;
    }
  }
}
