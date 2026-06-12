import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  console.log('Starting server...');
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
