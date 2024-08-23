import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { EmailService } from '../utilities/email.service';
import { SmsService } from '../utilities/sms.util';
import { AuthModule } from '../auth/auth.module';
import { GravatarService } from 'src/utilities/gravatar.util';
import { MerchantService } from 'src/merchant/merchant.service';
import { MerchantModule } from 'src/merchant/merchant.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    MerchantModule// Update this line
  ],
  providers: [
    UserService, 
    EmailService, 
    SmsService,
    GravatarService,
    MerchantService
  ],
  controllers: [UserController],
  exports: [UserService, MongooseModule], // Export UserService and MongooseModule
})
export class UserModule { }
