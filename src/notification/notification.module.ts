import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { EmailService } from 'src/utilities/email.service';
import { SmsService } from 'src/utilities/sms.util';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])
  ],
  providers: [
    NotificationService, 
    EmailService, 
    SmsService
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
