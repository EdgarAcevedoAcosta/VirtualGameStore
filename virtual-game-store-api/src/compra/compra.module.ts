import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller.js';
import { CompraService } from './compra.service.js';

@Module({
  controllers: [CompraController],
  providers: [CompraService]
})
export class CompraModule {}
