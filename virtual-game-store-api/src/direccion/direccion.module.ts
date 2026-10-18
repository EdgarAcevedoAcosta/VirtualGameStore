import { Module } from '@nestjs/common';
import { DireccionController } from './direccion.controller.js';
import { DireccionService } from './direccion.service.js';

@Module({
  controllers: [DireccionController],
  providers: [DireccionService]
})
export class DireccionModule {}
