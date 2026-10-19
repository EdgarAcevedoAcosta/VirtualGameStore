import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller.js';
import { ProductoService } from './producto.service.js';
import { PRODUCTO_REPOSITORY } from './producto.tokens.js';
import { ProductoMemoriaRepository } from './infra/producto-memoria.repository.js';

@Module({
  imports: [],
  controllers: [ProductoController],
  providers: [
    ProductoService,
    {
      provide: PRODUCTO_REPOSITORY,
      useClass: ProductoMemoriaRepository,
    },
  ],
  exports: [ProductoService],
})
export class ProductoModule {}
