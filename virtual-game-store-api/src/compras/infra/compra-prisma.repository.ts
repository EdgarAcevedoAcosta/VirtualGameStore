import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompraRepository } from '../Entidades/compra.repository';
import { Compra } from '../Entidades/entidades';
import { CrearCompraDatos } from '../dto/crear-compra';
import { ActualizarCompraDto } from '../dto/editar-compra';

@Injectable()
export class CompraPrismaRepository implements CompraRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Compra[]> {
    return this.prisma.compra.findMany();
  }
  buscarPorId(idCompra: number): Promise<Compra | null> {
    return this.prisma.compra.findUnique({ where: { idCompra } });
  }
  crearCompra(datos: CrearCompraDatos): Promise<Compra> {
    return this.prisma.compra.create({ data: { ...datos } });
  }
  async actualizarCompra(
    idCompra: number,
    datos: ActualizarCompraDto,
  ): Promise<Compra | null> {
    const compra = await this.prisma.compra.findUnique({
      where: { idCompra },
    });
    if (!compra) {
      return null;
    }
    return this.prisma.compra.update({
      where: { idCompra },
      data: datos,
    });
  }
  async eliminarCompra(idCompra: number): Promise<boolean> {
    const compra = await this.prisma.compra.findUnique({
      where: { idCompra },
    });
    if (!compra) {
      return false;
    }

    await this.prisma.compra.delete({ where: { idCompra } });
    return true;
  }
}
