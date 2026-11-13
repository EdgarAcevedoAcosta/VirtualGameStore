import { SetMetadata } from '@nestjs/common';

export const ROLES_REQUERIDOS = 'rolesRequeridos';

// Uso: @Roles(Rol.entrenador, Rol.admin) encima del metodo.
export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_REQUERIDOS, roles);
