import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './roles.guard';
import { MerchantModule } from 'src/merchant/merchant.module';
import { LocalStrategy } from './local.strategy';
import { MerchantAuthGuard } from './merchant-auth.guard';
import { JWT_SECRET } from 'src/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    MerchantModule,
  ],
  providers: [AuthService, MerchantAuthGuard, JwtStrategy, RolesGuard, LocalStrategy],
  exports: [
    AuthService, 
    MerchantAuthGuard, 
    JwtStrategy, 
    RolesGuard, 
    LocalStrategy,
    JwtModule
  ],
})
export class AuthModule {}