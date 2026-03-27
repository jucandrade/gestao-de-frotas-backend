import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 CORS liberado (modo simples para funcionar em produção)
  app.enableCors({
    origin: '*',
  });

  // ✅ Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🚀 Start da aplicação
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application running on port ${port}`);
}

bootstrap();