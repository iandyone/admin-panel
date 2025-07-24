import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { AppConfig } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<AppConfig> = app.get(ConfigService);

  await app.listen(process.env.PORT || configService.get('PORT_API'));
}

bootstrap();
