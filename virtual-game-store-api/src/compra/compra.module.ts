import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller.js';
import { CompraService } from './compra.service.js';
import { CompraMemoriaRepository } from './infra/compra-memory.repository.js';
import { COMPRA_REPOSITORY } from './compra.tokens.js';

@Module({
  imports: [],
  controllers: [CompraController],
  providers: [
    CompraService,
    {
      provide: COMPRA_REPOSITORY,
      useClass: CompraMemoriaRepository,
    },
  ],
  exports: [CompraService],
})
export class CompraModule {}
