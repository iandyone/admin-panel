import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { AppConfig } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<AppConfig> = app.get(ConfigService);

  app.enableCors({
    origin: process.env.ORIGINS.split(',') ?? [],
    methods: 'GET,HEAD,PATCH,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(configService.get('PORT_API') || process.env.PORT);
}

bootstrap();
