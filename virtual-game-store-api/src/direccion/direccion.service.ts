import { Inject, Injectable } from '@nestjs/common';
import { Direccion } from './Entidades/entidades';
import { DIRECCION_REPOSITORY } from './direccion.tokens';
import type { DireccionRepository } from './Entidades/direccion.repository';
import { CrearDireccionDto } from './dto/crear-direccion';
import { ActualizarDireccionDto } from './dto/actualizar-direccion';

@Injectable()
export class DireccionService {
  constructor(
    @Inject(DIRECCION_REPOSITORY)
    private readonly repo: DireccionRepository,
  ) {}

  listar(): Promise<Direccion[]> {
    return this.repo.listar();
  }

  buscarPorId(idDireccion: number): Promise<Direccion | null> {
    return this.repo.buscarPorId(idDireccion);
  }

  crearDireccion(dto: CrearDireccionDto): Promise<Direccion> {
    return this.repo.crearDireccion(dto);
  }

  actualizarDireccion(
    id: number,
    dto: ActualizarDireccionDto,
  ): Promise<Direccion | null> {
    return this.repo.actualizarDireccion(id, dto);
  }

  async eliminarDireccion(id: number): Promise<boolean> {
    await this.repo.eliminarDireccion(id);
    const direccion = await this.repo.buscarPorId(id);
    return direccion == null;
  }
}
