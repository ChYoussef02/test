import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Accessing the internal routes via Express (default HTTP adapter)
  const routes = app.getHttpServer()
    ._router.stack
    .filter((r) => r.route)
    .map((r) => `${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);

  Logger.log(`Available Routes:\n${routes.join('\n')}`);

  await app.listen(3000);
}
bootstrap();
