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
import { UsuarioService } from './usuario.service';
import { Publico } from '../auth/decoradores/publico-decorador';
import type { CrearUsuarioDto } from './dto/crear-usuario';
import type { ActualizarUsuarioDto } from './dto/actualizar-usuario';

@Controller('usuario')
export class UsuariosController {
  constructor(private readonly servicio: UsuarioService) {}

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
    const usuario = await this.servicio.buscarPorId(Number(id));
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }
    return usuario;
  }

  /** POST /usuario */
  @Post()
  @HttpCode(201)
  crearUsuario(@Body() dto: CrearUsuarioDto) {
    return this.servicio.crearUsuario(dto);
  }

  /** PATCH /usuario/2 */
  @Patch(':id')
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() dto: ActualizarUsuarioDto,
  ) {
    const usuario = await this.servicio.actualizarUsuario(Number(id), dto);
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }
    return usuario;
  }

  /** DELETE /usuario/2 */
  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string) {
    const usuario = await this.servicio.eliminarUsuario(Number(id));
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }
    return usuario;
  }
}
