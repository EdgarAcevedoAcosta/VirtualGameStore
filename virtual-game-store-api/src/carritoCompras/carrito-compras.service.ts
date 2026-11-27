import { Inject, Injectable } from '@nestjs/common';
import { CARRITO_REPOSITORY } from './carrito.tokens';
import type { CarritoRepository } from './Entidades/carrito.reporitory';
import { Carrito } from './Entidades/entidades';
import { AnadirCarritoDto } from './dto/añadir-carrito';
import { ActualizarCarritoDto } from './dto/actualizar-carrito';

@Injectable()
export class CarritoComprasService {
  constructor(
    @Inject(CARRITO_REPOSITORY)
    private readonly repo: CarritoRepository,
  ) {}

  listar(): Promise<Carrito[]> {
    return this.repo.listar();
  }

  buscarPorId(idCarrito: number): Promise<Carrito | null> {
    return this.repo.buscarPorId(idCarrito);
  }

  crearCarrito(dto: AnadirCarritoDto): Promise<Carrito> {
    return this.repo.crearCarrito(dto);
  }

  actualizarCarrito(
    id: number,
    dto: ActualizarCarritoDto,
  ): Promise<Carrito | null> {
    return this.repo.actualizarCarrito(id, dto);
  }

  /*
      async eliminarCarrito(id: number): Promise<boolean> {
        await this.repo.eliminarCarrito(id);
        const carrito = await this.repo.buscarPorId(id);
        return carrito == null;
      }*/
}
