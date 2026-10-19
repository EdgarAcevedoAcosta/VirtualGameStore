import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_REPOSITORY } from './usuarios.tokens';
import type { UsuarioRepository } from './Entidades/usuario.repository';
import { Usuario } from './Entidades/entidades';
import { CrearUsuarioDto } from './dto/crear-usuario';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repo: UsuarioRepository,
  ) {}

  listar(): Promise<Usuario[]> {
    return this.repo.listar();
  }

  buscarPorId(idusuario: number): Promise<Usuario | null> {
    return this.repo.buscarPorId(idusuario);
  }

  crearUsuario(dto: CrearUsuarioDto): Promise<Usuario> {
    return this.repo.crearUsuario(dto);
  }

  actualizarUsuario(
    id: number,
    dto: ActualizarUsuarioDto,
  ): Promise<Usuario | null> {
    return this.repo.actualizarUsuario(id, dto);
  }

  async eliminarUsuario(id: number): Promise<boolean> {
    await this.repo.eliminarUsuario(id);
    const usuario = await this.repo.buscarPorId(id);
    return usuario == null;
  }
}
