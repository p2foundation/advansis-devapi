import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || process.env.SERVER_PORT;
  await app.listen(port);
  logger.log(`Lidapay application is listening on port ${port}!`);
}
bootstrap();
