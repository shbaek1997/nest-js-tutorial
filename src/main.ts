import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //validationPipe options...
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //transform data type to fit automatically..
    }),
  );
  await app.listen(3000);
}
bootstrap();
