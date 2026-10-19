import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { NuevoUsuario, Rol, Usuario } from '../dominio/usuario';
import { UsuarioRepository } from '../dominio/usuario.reporitory';

// Las mismas tres cuentas del doble de la Unidad III, para que el front
// funcione igual contra esta API.
const CUENTAS: NuevoUsuario[] = [
  {
    correo: 'karla@itson.mx',
    passwordHash: '',
    rol: Rol.cliente,
  },
  {
    correo: 'ana@itson.mx',
    passwordHash: '',
    rol: Rol.admin,
  },
  {
    correo: 'admin@itson.mx',
    passwordHash: '',
    rol: Rol.admin,
  },
];

@Injectable()
export class UsuarioMemoriaRepository implements UsuarioRepository {
  private readonly datos = new Map<number, Usuario>(); // id -> usuario
  private siguienteId = 1;

  constructor() {
    const hash = bcrypt.hashSync('virtualstore', 10);
    for (const c of CUENTAS) {
      void this.guardar({ ...c, passwordHash: hash });
    }
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const buscado = correo.toLowerCase(); // Karla@ITSON.mx es el mismo correo
    return [...this.datos.values()].find((u) => u.correo === buscado) ?? null;
  }

  async guardar(nuevo: NuevoUsuario): Promise<Usuario> {
    const usuario: Usuario = {
      ...nuevo,
      correo: nuevo.correo.toLowerCase(),
      id: this.siguienteId++, // el id lo pone el repositorio, como haria MySQL
      creadoEn: new Date(),
    };
    this.datos.set(usuario.id, usuario);
    return usuario;
  }
}
