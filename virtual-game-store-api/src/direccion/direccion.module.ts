import { Module } from '@nestjs/common';
import { DireccionController } from './direccion.controller.js';
import { DireccionService } from './direccion.service.js';
import { DIRECCION_REPOSITORY } from './direccion.tokens.js';
import { DireccionMemoriaRepository } from './infra/direccion-memory.repository.js';

@Module({
  imports: [],
  controllers: [DireccionController],
  providers: [
    DireccionService,
    {
      provide: DIRECCION_REPOSITORY,
      useClass: DireccionMemoriaRepository,
    },
  ],
  exports: [DireccionService],
})
export class DireccionModule {}
