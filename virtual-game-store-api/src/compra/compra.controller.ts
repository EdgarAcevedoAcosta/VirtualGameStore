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
import { CompraService } from './compra.service';
import type { CrearCompraDto } from './dto/crear-compra';

@Controller('compra')
export class CompraController {
  constructor(private readonly servicio: CompraService) {}

  /** GET /usuario */
  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /usuario/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const compra = await this.servicio.buscarPorId(Number(id));
    if (!compra) {
      throw new NotFoundException(`No existe el compra ${id}`);
    }
    return compra;
  }

  /** POST /compra */
  @Post()
  @HttpCode(201)
  crearCompra(@Body() dto: CrearCompraDto) {
    return this.servicio.crearCompra(dto);
  }

  /** PATCH /compra/2 */
  /*
  @Patch(':id')
  async actualizarCompra(
    @Param('id') id: string,
    @Body() dto: ActualizarCompraDto,
  ) {
    const compra = await this.servicio.actualizarCompra(Number(id), dto);
    if (!compra) {
      throw new NotFoundException(`No existe el compra ${id}`);
    }
    return compra;
  }*/

  /** DELETE /compra/2 */
  @Delete(':id')
  async eliminarCompra(@Param('id') id: string) {
    const compra = await this.servicio.eliminarCompra(Number(id));
    if (!compra) {
      throw new NotFoundException(`No existe el compra ${id}`);
    }
    return compra;
  }
}
