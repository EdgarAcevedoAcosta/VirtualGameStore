import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service.js';
import { USUARIO_REPOSITORY } from './usuarios.tokens.js';
import { UsuariosController } from './usuario.controller.js';
import { UsuarioPrismaRepository } from './infra/usuario-prisma.repository.js';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [
    UsuarioService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioPrismaRepository,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
