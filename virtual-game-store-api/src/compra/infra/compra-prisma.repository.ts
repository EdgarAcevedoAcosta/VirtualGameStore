import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompraRepository } from '../Entidades/compra.repository';
import { Compra } from '../Entidades/entidades';
import { CrearCompraDto } from '../dto/crear-compra';

@Injectable()
export class CompraPrismaRepository implements CompraRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Compra[]> {
    return this.prisma.compra.findMany();
  }
  buscarPorId(idCompra: number): Promise<Compra | null> {
    return this.prisma.compra.findUnique({ where: { idCompra } });
  }
  crearCompra(datos: CrearCompraDto): Promise<Compra> {
    return this.prisma.compra.create({ data: { ...datos } });
  }
  async eliminarCompra(idCompra: number): Promise<boolean> {
    const i = this.prisma.compra.findUnique({
      where: { idCompra },
    });
    if (!i) {
      return false;
    } else {
      this.prisma.compra.delete({ where: { idCompra } });
      return true;
    }
  }
}
