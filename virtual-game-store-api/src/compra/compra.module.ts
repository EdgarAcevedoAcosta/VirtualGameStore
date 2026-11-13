import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller.js';
import { CompraService } from './compra.service.js';

import { COMPRA_REPOSITORY } from './compra.tokens.js';
import { CompraPrismaRepository } from './infra/compra-prisma.repository.js';

@Module({
  imports: [],
  controllers: [CompraController],
  providers: [
    CompraService,
    {
      provide: COMPRA_REPOSITORY,
      useClass: CompraPrismaRepository,
    },
  ],
  exports: [CompraService],
})
export class CompraModule {}
