import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';
import { AppConfig } from 'src/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<AppConfig> = app.get(ConfigService);

  await app.listen(configService.get('PORT_API'));
}

bootstrap();
