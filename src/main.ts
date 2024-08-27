import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SERVER_PORT } from './constants';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const description = `
    A secure and scalable API designed to power the Lidapay ecosystem, 
    providing a seamless experience for users across various platforms.
    Powered by Advansis Technologies.
  `;
  
  const config = new DocumentBuilder()
    .setTitle('Lidapay API')
    .setDescription(description)
    .setVersion('1.0')
    .addTag('lidapay')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = process.env.PORT || SERVER_PORT;
  
  try {
    await app.listen(port);
    logger.debug(`Lidapay app is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error(`Error starting Lidapay app: ${error.message}`);
    process.exit(1);
  }
}
bootstrap();