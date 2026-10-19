import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalFilters(new DominioExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new SobreInterceptor());
  app.enableCors({
    origin: ['http://localhost:5173'], // el puerto de Vite (React, Unidad III)
    exposedHeaders: ['Location', 'X-Request-Id'], // encabezados que el front puede leer
  });
  const reflector = app.get(Reflector); // el guard lo usa para leer @Publico()
  app.useGlobalGuards(new JwtAuthGuard(reflector)); // TODAS las rutas piden token
  const config = new DocumentBuilder()
    .setTitle('API VirtualGameStore') // titulo que sale arriba de /docs
    .setVersion('1.0')
    .addBearerAuth() // agrega el boton Authorize
    .addSecurityRequirements('bearer') // pone el candado en todas las rutas
    .build();
  const documento = SwaggerModule.createDocument(app, config); // recorre controllers y DTO
  SwaggerModule.setup('docs', app, documento); // lo publica en /docs
}*/
bootstrap();
