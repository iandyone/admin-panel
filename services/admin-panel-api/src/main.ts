import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './modules/app/app.module';
import { AppConfig } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<AppConfig> = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Admin panel API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.enableCors({
    origin: process.env.ORIGINS.split(',') ?? [],
    methods: 'GET,HEAD,PATCH,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(configService.get('PORT_API') || process.env.PORT);
}

bootstrap();
