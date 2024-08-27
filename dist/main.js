"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const constants_1 = require("./constants");
async function bootstrap() {
    const logger = new common_1.Logger(bootstrap.name);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const description = `
    A secure and scalable API designed to power the Lidapay ecosystem, 
    providing a seamless experience for users across various platforms.
    Powered by Advansis Technologies.
  `;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lidapay API')
        .setDescription(description)
        .setVersion('1.0')
        .addTag('lidapay')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    const port = process.env.PORT || constants_1.SERVER_PORT;
    try {
        await app.listen(port);
        logger.debug(`Lidapay app is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        logger.error(`Error starting Lidapay app: ${error.message}`);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map