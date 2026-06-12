import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Starting server...');
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
