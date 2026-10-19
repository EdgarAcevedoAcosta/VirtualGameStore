import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller.js';
import { CategoriaService } from './categoria.service.js';
import { CATEGORIA_REPOSITORY } from './categoria.tokens.js';
import { CategoriaMemoriaRepository } from './infra/categoria-memory.repository.js';

@Module({
  imports: [],
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    {
      provide: CATEGORIA_REPOSITORY,
      useClass: CategoriaMemoriaRepository,
    },
  ],
  exports: [CategoriaService],
})
export class CategoriaModule {}
