import { forwardRef, Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from './schemas/merchant.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { RewardService } from 'src/reward/reward.service';
import { RewardModule } from 'src/reward/reward.module';
import { MerchantAuthGuard } from 'src/auth/merchant-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    RewardModule
  ],
  providers: [
    MerchantService,
    RewardService,
    MerchantAuthGuard,
    JwtStrategy
  ],
  controllers: [MerchantController],
  exports: [MerchantService, MongooseModule], // Export MerchantService

})
export class MerchantModule {}
