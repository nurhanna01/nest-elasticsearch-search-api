import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { bootstrapProductIndex } from './elasticsearch/elasticsearch.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await bootstrapProductIndex();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
