import { Inject, Injectable } from '@nestjs/common';
import { Categoria } from './Entidades/entidades';
import { CATEGORIA_REPOSITORY } from './categoria.tokens';
import type { CategoriaRepository } from './Entidades/categoria.repository';
import { CrearCategoriaDto } from './dto/crear-Categoria';
import { editarCategoriaDto } from './dto/editar-categoria';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly repo: CategoriaRepository,
  ) {}

  listar(): Promise<Categoria[]> {
    return this.repo.listar();
  }

  buscar(idDireccion: number): Promise<Categoria | null> {
    return this.repo.buscarPorId(idDireccion);
  }

  crear(dto: CrearCategoriaDto): Promise<Categoria> {
    return this.repo.crear(dto);
  }

  editar(id: number, dto: editarCategoriaDto): Promise<Categoria | null> {
    return this.repo.editar(id, dto);
  }

  async eliminar(id: number): Promise<boolean> {
    await this.repo.eliminar(id);
    const categoria = await this.repo.buscarPorId(id);
    return categoria == null;
  }
}
