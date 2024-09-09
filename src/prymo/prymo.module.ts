import { forwardRef, Module } from '@nestjs/common';
import { PrymoService } from './prymo.service';
import { PrymoController } from './prymo.controller';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { HttpModule } from '@nestjs/axios';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MerchantService } from 'src/merchant/merchant.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    HttpModule,
    TransactionModule,
    forwardRef(() => MerchantModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [
    PrymoService,
    TransactionService,
    MerchantService
  ],
  controllers: [PrymoController],
  exports: [PrymoService]
})
export class PrymoModule {}
