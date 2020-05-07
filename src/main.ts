import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const { PORT = 3000 } = process.env;
  await app.listen(PORT, () => {
    Logger.log(`Api Server is listening on port ${PORT}`, 'Bootstrap');
  });
}
bootstrap();
