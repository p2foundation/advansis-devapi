import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { MerchantService } from 'src/merchant/merchant.service';
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports: [
    HttpModule,
    TransactionModule,
    MerchantModule
  ],
  controllers: [AirtimeController],
  providers: [
    AirtimeService, 
    TransactionService,
    MerchantService
  ]
})
export class AirtimeModule {}
