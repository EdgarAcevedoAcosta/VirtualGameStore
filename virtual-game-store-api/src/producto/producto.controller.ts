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
import { Publico } from '../auth/decoradores/publico-decorador';
import { ProductoService } from './producto.service';
import type { CrearProductoDto } from './dto/crear-producto';
import type { ActualizarProductoDto } from './dto/actualizar-produto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly servicio: ProductoService) {}

  /** GET /producto */
  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /producto/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const producto = await this.servicio.buscarPorId(Number(id));
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }

  /** POST /producto */
  @Post()
  @HttpCode(201)
  crearUsuario(@Body() dto: CrearProductoDto) {
    return this.servicio.crearProducto(dto);
  }

  /** PATCH /producto/2 */
  @Patch(':id')
  async actualizarProducto(
    @Param('id') id: string,
    @Body() dto: ActualizarProductoDto,
  ) {
    const producto = await this.servicio.actualizarProducto(Number(id), dto);
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }

  /** DELETE /producto/2 */
  @Delete(':id')
  async eliminarProducto(@Param('id') id: string) {
    const producto = await this.servicio.eliminarProducto(Number(id));
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }
}
