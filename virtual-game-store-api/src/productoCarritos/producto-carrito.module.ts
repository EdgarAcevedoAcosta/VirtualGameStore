import { Module } from '@nestjs/common';
import { ProductoCarritoService } from './producto-carrito.service';
import { ProductoCarritoController } from './producto-carrito.controller';
import { PRODUCTO_CARRITO_REPOSITORY } from './producto-carrito.token';
import { ProductoCarritoPrismaRepository } from './infra/producto-carrito-prisma.repository';

@Module({
  imports: [],
  controllers: [ProductoCarritoController],
  providers: [
    ProductoCarritoService,
    {
      provide: PRODUCTO_CARRITO_REPOSITORY,
      useClass: ProductoCarritoPrismaRepository,
    },
  ],
  exports: [ProductoCarritoService],
})
export class ProductoCarritoModule {}
