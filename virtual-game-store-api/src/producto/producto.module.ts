import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller.js';
import { ProductoService } from './producto.service.js';
import { PRODUCTO_REPOSITORY } from './producto.tokens.js';
import { ProductoPrismaRepository } from './infra/producto-prisma.repository.js';

@Module({
  imports: [],
  controllers: [ProductoController],
  providers: [
    ProductoService,
    {
      provide: PRODUCTO_REPOSITORY,
      useClass: ProductoPrismaRepository,
    },
  ],
  exports: [ProductoService],
})
export class ProductoModule {}
