import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './productos/producto.module';
import { DireccionModule } from './direcciones/direccion.module';
import { CompraModule } from './compras/compra.module';

import { CategoriaModule } from './categorias/categoria.module';
import { PeticionIdMiddleware } from './comun/middleware/peticion-id-middleware';
import { PrismaModule } from './prisma/prisma.module';
import { ProductoCarritoModule } from './productoCarritos/producto-carrito.module';
import { CarritoComprasModule } from './carritoCompras/carrito-compras.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsuarioModule,
    ProductoModule,
    DireccionModule,
    CompraModule,
    CarritoComprasModule,
    CategoriaModule,
    ProductoCarritoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PeticionIdMiddleware) // que middleware
      .forRoutes('*'); // en que rutas: '*' = todas
  }
}
