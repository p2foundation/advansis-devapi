import { Module } from '@nestjs/common';
import { PrymoService } from './prymo.service';
import { PrymoController } from './prymo.controller';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { HttpModule } from '@nestjs/axios';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MerchantService } from 'src/merchant/merchant.service';

@Module({
  imports: [
    HttpModule,
    TransactionModule,
    MerchantModule
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
