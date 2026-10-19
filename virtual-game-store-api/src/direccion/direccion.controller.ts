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
import { DireccionService } from './direccion.service';
import type { CrearDireccionDto } from './dto/crear-direccion';
import type { ActualizarDireccionDto } from './dto/actualizar-direccion';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly servicio: DireccionService) {}

  /** GET /direccion */
  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /direccion/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const direccion = await this.servicio.buscarPorId(Number(id));
    if (!direccion) {
      throw new NotFoundException(`No existe el direccion ${id}`);
    }
    return direccion;
  }

  /** POST /direccion */
  @Post()
  @HttpCode(201)
  crearDireccion(@Body() dto: CrearDireccionDto) {
    return this.servicio.crearDireccion(dto);
  }

  /** PATCH /direccion/2 */
  @Patch(':id')
  async actualizarDireccion(
    @Param('id') id: string,
    @Body() dto: ActualizarDireccionDto,
  ) {
    const direccion = await this.servicio.actualizarDireccion(Number(id), dto);
    if (!direccion) {
      throw new NotFoundException(`No existe el direccion ${id}`);
    }
    return direccion;
  }

  /** DELETE /direccion/2 */
  @Delete(':id')
  async eliminarDireccion(@Param('id') id: string) {
    const direccion = await this.servicio.eliminarDireccion(Number(id));
    if (!direccion) {
      throw new NotFoundException(`No existe el direccion ${id}`);
    }
    return direccion;
  }
}
