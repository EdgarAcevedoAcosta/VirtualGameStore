import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { DireccionModule } from './direccion/direccion.module';
import { CompraModule } from './compra/compra.module';
import { CarritoComprasModule } from './carrito-compras/carrito-compras.module';
import { CategoriaModule } from './categoria/categoria.module';
//import { PeticionIdMiddleware } from './comun/middleware/peticion-id.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    ProductoModule,
    DireccionModule,
    CompraModule,
    CarritoComprasModule,
    CategoriaModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
    // .apply(PeticionIdMiddleware) // que middleware
    //.forRoutes('*'); // en que rutas: '*' = todas
  }
}
