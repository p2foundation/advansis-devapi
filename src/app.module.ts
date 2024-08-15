import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Advansis API',
    },
    {
      provide: 'MESSAGE',
      inject: ['APP_NAME'],
      useFactory: (appName: string) => `Hello, ${appName}!`,
    },
  ],
})
export class AppModule {}
