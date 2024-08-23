import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { EmailService } from '../utilities/email.service';
import { SmsService } from '../utilities/sms.util';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GravatarService } from '../utilities/gravatar.util';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MerchantService } from 'src/merchant/merchant.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret:  `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '60m' },
    }),
    MerchantModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtService,
    UserService,
    EmailService,
    SmsService,
    GravatarService,
    LocalStrategy,
    MerchantService
  ],
  exports: [
    AuthService,
    EmailService,
    SmsService
  ]
})
export class AuthModule {}