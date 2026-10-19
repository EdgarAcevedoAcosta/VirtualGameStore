import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service.js';
import { USUARIO_REPOSITORY } from './usuarios.tokens.js';
import { UsuarioMemoriaRepository } from './infra/usuario-memoria.repository.js';
import { UsuariosController } from './usuario.controller.js';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [
    UsuarioService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioMemoriaRepository,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
