import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CarritoComprasService } from './carrito-compras.service';
import { Publico } from '../auth/decoradores/publico-decorador';
import type { ActualizarCarritoDto } from './dto/actualizar-carrito';
import type { AnadirCarritoDto } from './dto/añadir-carrito';

@Controller('carrito-compras')
export class CarritoComprasController {
  constructor(private readonly servicio: CarritoComprasService) {}

  /** GET /carrito */
  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /carrito/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const carrito = await this.servicio.buscarPorId(Number(id));
    if (!carrito) {
      throw new NotFoundException(`No existe el carrito ${id}`);
    }
    return carrito;
  }

  /** POST /usuario */
  @Post()
  @HttpCode(201)
  crearUsuario(@Body() dto: AnadirCarritoDto) {
    return this.servicio.crearCarrito(dto);
  }

  /** PATCH /usuario/2 */
  @Patch(':id')
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() dto: ActualizarCarritoDto,
  ) {
    const carrito = await this.servicio.actualizarCarrito(Number(id), dto);
    if (!carrito) {
      throw new NotFoundException(`No existe el carrito ${id}`);
    }
    return carrito;
  }

  /** DELETE /usuario/2 */
  /*
  @Delete(':id')
  async eliminarCarrito(@Param('id') id: string) {
    const carrito = await this.servicio.eliminarCarrito(Number(id));
    if (!carrito) {
      throw new NotFoundException(`No existe el carrito ${id}`);
    }
    return carrito;
  }*/
}
