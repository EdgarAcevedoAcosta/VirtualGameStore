import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Publico } from '../auth/decoradores/publico-decorador';
import { CategoriaService } from './categoria.service';
import { CrearCategoriaDto } from './dto/crear-Categoria';
import { editarCategoriaDto } from './dto/editar-categoria';

@Controller('categorias')
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
  async buscar(@Param('id') id: string) {
    const categoria = await this.servicio.buscar(Number(id));
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }

  /** POST /categoria */
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearCategoriaDto) {
    return this.servicio.crear(dto);
  }

  /** PATCH /categoria/2 */
  /**/
  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: editarCategoriaDto,
  ) {
    const categoria = await this.servicio.editar(Number(id), dto);
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }

  /** DELETE /categoria/2 */
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: string) {
    const categoria = await this.servicio.eliminar(Number(id));
    if (!categoria) {
      throw new NotFoundException(`No existe el categoria ${id}`);
    }
    return categoria;
  }
}
