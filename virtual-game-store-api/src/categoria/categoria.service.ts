import { Inject, Injectable } from '@nestjs/common';
import { Categoria } from './Entidades/entidades';
import { CATEGORIA_REPOSITORY } from './categoria.tokens';
import type { CategoriaRepository } from './Entidades/categoria.repository';
import { CrearCategoriaDto } from './dto/crear-Categoria';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly repo: CategoriaRepository,
  ) {}

  listar(): Promise<Categoria[]> {
    return this.repo.listar();
  }

  buscarPorId(idDireccion: number): Promise<Categoria | null> {
    return this.repo.buscarPorId(idDireccion);
  }

  crearCategoria(dto: CrearCategoriaDto): Promise<Categoria> {
    return this.repo.crearCategoria(dto);
  }

  /*
  actualizarCategoria(
    id: number,
    dto: ActualizarCategoriaDto,
  ): Promise<Categoria | null> {
    return this.repo.actualizarCategoria(id, dto);
  }*/

  async eliminarCategoria(id: number): Promise<boolean> {
    await this.repo.eliminarCategoria(id);
    const categoria = await this.repo.buscarPorId(id);
    return categoria == null;
  }
}
