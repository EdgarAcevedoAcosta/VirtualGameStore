import { Module } from '@nestjs/common';
import { CarritoComprasController } from './carrito-compras.controller.js';
import { CarritoComprasService } from './carrito-compras.service.js';
import { CARRITO_REPOSITORY } from './carrito.tokens.js';
import { CarritoPrismaRepository } from './infra/carrito-prisma.repository.js';

@Module({
  imports: [],
  controllers: [CarritoComprasController],
  providers: [
    CarritoComprasService,
    {
      provide: CARRITO_REPOSITORY,
      useClass: CarritoPrismaRepository,
    },
  ],
  exports: [CarritoComprasService],
})
export class CarritoComprasModule {}
