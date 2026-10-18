import { Module } from '@nestjs/common';
import { CarritoComprasController } from './carrito-compras.controller.js';
import { CarritoComprasService } from './carrito-compras.service.js';

@Module({
  controllers: [CarritoComprasController],
  providers: [CarritoComprasService]
})
export class CarritoComprasModule {}
