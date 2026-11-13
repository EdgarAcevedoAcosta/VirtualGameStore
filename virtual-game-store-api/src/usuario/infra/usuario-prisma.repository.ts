import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../Entidades/usuario.repository';

import { Usuario } from '../Entidades/entidades';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearUsuarioDto } from '../dto/crear-usuario';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario';

@Injectable()
export class UsuarioPrismaRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }
  buscarPorId(idUsuario: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { idUsuario } });
  }
  crearUsuario(datos: CrearUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: {
        nombre: datos.nombre!,
        correo: datos.correo!,
        passwordHash: datos.passwordHash!,
        rol: datos.rol,
        activo: datos.activo,
      },
    });
  }
  async actualizarUsuario(
    idUsuario: number,
    datos: ActualizarUsuarioDto,
  ): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario },
    });
    if (!usuario) {
      return null;
    }

    return this.prisma.usuario.update({
      where: { idUsuario },
      data: {
        nombre: datos.nombre!,
        correo: datos.correo!,
        passwordHash: datos.passwordHash!,
        rol: datos.rol,
        activo: datos.activo,
      },
    });
  }
  async eliminarUsuario(idUsuario: number): Promise<boolean> {
    const i = this.prisma.usuario.findUnique({
      where: { idUsuario },
    });
    if (!i) {
      return false;
    } else {
      this.prisma.usuario.delete({ where: { idUsuario } });
      return true;
    }
  }
}
