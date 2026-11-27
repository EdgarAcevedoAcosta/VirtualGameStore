import * as bcrypt from 'bcryptjs';
import type { UsuarioRepository } from './Entidades/usuario.repository';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  const repo: jest.Mocked<UsuarioRepository> = {
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    crearUsuario: jest.fn(),
    actualizarUsuario: jest.fn(),
    eliminarUsuario: jest.fn(),
  };
  const servicio = new UsuarioService(repo);

  it('guarda el hash bcrypt de la contraseña ingresada', async () => {
    repo.crearUsuario.mockImplementation(async (datos) => ({
      ...datos,
      idusuario: 1,
      activo: 'activo',
    }));

    await servicio.crearUsuario({
      nombre: 'Maria',
      correo: 'maria@example.com',
      passwordHash: 'maria123',
    });

    const [datosGuardados] = repo.crearUsuario.mock.calls[0];
    expect(datosGuardados.passwordHash).not.toBe('maria123');
    expect(await bcrypt.compare('maria123', datosGuardados.passwordHash)).toBe(
      true,
    );
  });
});
