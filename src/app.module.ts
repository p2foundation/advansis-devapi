import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MONGODB_URI } from './constants';
import { NotificationModule } from './notification/notification.module';
import { ReloadlyModule } from './reloadly/reloadly.module';
import { RewardModule } from './reward/reward.module';
import { TransactionModule } from './transaction/transaction.module';
import { AirtimeModule } from './one4all/airtime/airtime.module';
import { InternetModule } from './one4all/internet/internet.module';
import { MobilemoneyModule } from './one4all/mobilemoney/mobilemoney.module';
import { SmsModule } from './one4all/sms/sms.module';
import { PscardpaymentModule } from './payswitch/pscardpayment/pscardpayment.module';
import { PsmobilemoneyModule } from './payswitch/psmobilemoney/psmobilemoney.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || MONGODB_URI),
    HttpModule,
    AuthModule,
    UserModule,
    RewardModule,
    TransactionModule,
    NotificationModule,
    ReloadlyModule,
    AirtimeModule,
    InternetModule,
    MobilemoneyModule,
    SmsModule,
    PscardpaymentModule,
    PsmobilemoneyModule,
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
