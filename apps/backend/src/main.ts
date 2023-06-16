import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Guitar Shop')
    .setDescription('Guitar Shop service API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Enter your Bearer token',
    })
    .build();

  const globalPrefix = 'guitar-shop';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.APP_PORT;
  app.enableCors();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
