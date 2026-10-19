import { Inject, Injectable } from '@nestjs/common';
import { COMPRA_REPOSITORY } from './compra.tokens';
import type { CompraRepository } from './Entidades/compra.repository';
import { Compra } from './Entidades/entidades';
import { CrearCompraDto } from './dto/crear-compra';

@Injectable()
export class CompraService {
  constructor(
    @Inject(COMPRA_REPOSITORY)
    private readonly repo: CompraRepository,
  ) {}

  listar(): Promise<Compra[]> {
    return this.repo.listar();
  }

  buscarPorId(idCompra: number): Promise<Compra | null> {
    return this.repo.buscarPorId(idCompra);
  }

  crearCompra(dto: CrearCompraDto): Promise<Compra> {
    return this.repo.crearCompra(dto);
  }
  /*
  actualizarCompra(
    id: number,
    dto: ActualizarCompraDto,
  ): Promise<Compra | null> {
    return this.repo.actualizarCompra(id, dto);
  }*/

  async eliminarCompra(id: number): Promise<boolean> {
    await this.repo.eliminarCompra(id);
    const compra = await this.repo.buscarPorId(id);
    return compra == null;
  }
}
