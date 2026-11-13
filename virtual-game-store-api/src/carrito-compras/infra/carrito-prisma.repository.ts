import { Injectable } from '@nestjs/common';
import { ActualizarCarritoDto } from '../dto/actualizar-carrito';
import { CarritoRepository } from '../Entidades/carrito.reporitory';
import { PrismaService } from '../../prisma/prisma.service';
import { Carrito } from '../Entidades/entidades';
import { AnadirCarritoDto } from '../dto/añadir-carrito';

@Injectable()
export class CarritoPrismaRepository implements CarritoRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Carrito[]> {
    return this.prisma.carritoCompra.findMany();
  }
  buscarPorId(idCarrito: number): Promise<Carrito | null> {
    return this.prisma.carritoCompra.findUnique({ where: { idCarrito } });
  }
  crearCarrito(datos: AnadirCarritoDto): Promise<Carrito> {
    return this.prisma.carritoCompra.create({
      data: {
        idCarrito: datos.idCarrito,
        idUsuario: datos.idUsuario,
        total: datos.total,
      },
    });
  }
  async actualizarCarrito(
    idCarrito: number,
    datos: ActualizarCarritoDto,
  ): Promise<Carrito | null> {
    const carrito = await this.prisma.carritoCompra.findUnique({
      where: { idCarrito },
    });
    if (!carrito) {
      return null;
    }

    return this.prisma.carritoCompra.update({
      where: { idCarrito },
      data: { 
        total: datos.total,
        idUsuario: datos.idUsuario,  
      },
    });
  }
}
