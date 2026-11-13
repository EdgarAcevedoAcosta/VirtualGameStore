import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadJwt } from '../dominio/usuario';
import { ROLES_REQUERIDOS } from '../decoradores/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {
    // Que roles pide la ruta (lo que puso @Roles). Puede no pedir ninguno.
    const requeridos = this.reflector.getAllAndOverride<
      ('cliente' | 'admin')[]
    >(ROLES_REQUERIDOS, [contexto.getHandler(), contexto.getClass()]);
    if (!requeridos || requeridos.length === 0) {
      return true; // sin @Roles: basta con haber pasado el JwtAuthGuard
    }

    // El usuario lo dejo la JwtStrategy en req.user.
    const usuario = contexto
      .switchToHttp()
      .getRequest<{ user?: PayloadJwt }>().user;
    if (!usuario) {
      throw new ForbiddenException(
        `Esta operacion requiere el rol: ${requeridos.join(' o ')}`,
      );
    }

    const rolUsuario = usuario.rol as 'cliente' | 'admin';
    if (!requeridos.includes(rolUsuario)) {
      throw new ForbiddenException(
        `Esta operacion requiere el rol: ${requeridos.join(' o ')}`,
      );
    }
    return true;
  }
}
