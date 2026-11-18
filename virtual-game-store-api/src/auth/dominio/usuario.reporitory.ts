import { NuevoUsuario, Usuario } from './usuario';

// Lo que el AuthService necesita. No sabe si es memoria o MySQL.
export interface UsuarioRepository {
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  guardar(nuevo: NuevoUsuario): Promise<Usuario>;
  registrarUsuario(nuevo: Omit<NuevoUsuario, 'rol'>): Promise<Usuario>;
}
