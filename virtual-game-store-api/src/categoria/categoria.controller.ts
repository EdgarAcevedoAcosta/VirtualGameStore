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
import { CategoriaService } from './categoria.service';
import type { CrearCategoriaDto } from './dto/crear-Categoria';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly servicio: CategoriaService) {}

  /** GET /categoria */
  @Publico()
  @Get()
  listar() {
    return this.servicio.listar();
  }

  /** GET /categoria/2 */
  @Publico()
  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const categoria = await this.servicio.buscarPorId(Number(id));
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }

  /** POST /categoria */
  @Post()
  @HttpCode(201)
  crearCategoria(@Body() dto: CrearCategoriaDto) {
    return this.servicio.crearCategoria(dto);
  }

  /** PATCH /categoria/2 */
  /*
  @Patch(':id')
  async actualizarCategoria(
    @Param('id') id: string,
    @Body() dto: ActualizarCategoriaDto,
  ) {
    const categoria = await this.servicio.actualizarCategoria(Number(id), dto);
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }*/

  /** DELETE /categoria/2 */
  @Delete(':id')
  async eliminarCategoria(@Param('id') id: string) {
    const categoria = await this.servicio.eliminarCategoria(Number(id));
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }
}
