import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Categoria } from '../Entidades/entidades';
import { CategoriaRepository } from '../Entidades/categoria.repository';
import { CrearCategoriaDto } from '../dto/crear-Categoria';
import { editarCategoriaDto } from '../dto/editar-categoria';

@Injectable()
export class CategoriaPrismaRepository implements CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }
  buscarPorId(idCategoria: number): Promise<Categoria | null> {
    return this.prisma.categoria.findUnique({ where: { idCategoria } });
  }
  crear(datos: CrearCategoriaDto): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: datos,
    });
  }
  async editar(
    idCategoria: number,
    datos: editarCategoriaDto,
  ): Promise<Categoria | null> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { idCategoria },
    });
    if (!categoria) {
      return null;
    }

    return this.prisma.categoria.update({
      where: { idCategoria },
      data: datos,
    });
  }
  async eliminar(idCategoria: number): Promise<boolean> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { idCategoria },
    });
    if (!categoria) {
      return false;
    }

    await this.prisma.categoria.delete({ where: { idCategoria } });
    return true;
  }
}
