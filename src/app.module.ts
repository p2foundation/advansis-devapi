import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Advansis API v1.0.0',
    },
    {
      provide: 'MESSAGE',
      inject: ['APP_NAME'],
      useFactory: (appName: string) => `Hello, ${appName}!`,
    },
  ],
})
export class AppModule {}
