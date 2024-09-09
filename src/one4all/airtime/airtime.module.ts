import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { MerchantService } from 'src/merchant/merchant.service';
import { MerchantModule } from 'src/merchant/merchant.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    HttpModule,
    TransactionModule,
    forwardRef(() => UserModule),
    forwardRef(() => MerchantModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AirtimeController],
  providers: [
    AirtimeService, 
    TransactionService,
    MerchantService
  ],
  exports: [AirtimeService]
})
export class AirtimeModule {}
