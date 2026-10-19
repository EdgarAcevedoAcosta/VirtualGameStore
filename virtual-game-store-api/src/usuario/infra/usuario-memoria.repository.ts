import { Injectable } from '@nestjs/common';
import { Usuario } from '../Entidades/entidades';
import { CrearUsuarioDto } from '../dto/crear-usuario';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario';

@Injectable()
export class UsuarioMemoriaRepository {
  private usuarios: Usuario[] = [];
  private siguienteId: number = 1;
  async listar(): Promise<Usuario[]> {
    return this.usuarios;
  }
  async buscarPorId(idusuario: number): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.idusuario === idusuario) ?? null;
  }
  async crearUsuario(datos: CrearUsuarioDto): Promise<Usuario> {
    const nU: Usuario = {
      idusuario: this.siguienteId++,
      nombre: datos.nombre,
      correo: datos.correo,
      contrasena: datos.contrasena,
      rol: 'cliente',
      activo: 'activo',
    };
    this.usuarios.push(nU);
    return nU;
  }
  async actualizarUsuario(
    idUsuario: number,
    datos: ActualizarUsuarioDto,
  ): Promise<Usuario | null> {
    const usuario = await this.buscarPorId(idUsuario);
    if (!usuario) {
      return null;
    }
    if (datos.contrasena !== undefined) {
      usuario.contrasena = datos.contrasena;
    }
    if (datos.correo !== undefined) {
      usuario.correo = datos.correo;
    }
    if (datos.activo !== undefined) {
      usuario.activo = datos.activo;
    }

    return usuario;
  }
  async eliminarUsuario(idUsuario: number): Promise<boolean> {
    const i = this.usuarios.findIndex((u) => u.idusuario === idUsuario);
    if (i === -1) {
      return false;
    }
    const [eliminado] = this.usuarios.slice(i, 1);
    return true;
  }
}
