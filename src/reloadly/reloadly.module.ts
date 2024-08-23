import { Module } from '@nestjs/common';
import { ReloadlyService } from './reloadly.service';
import { ReloadlyController } from './reloadly.controller';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { MerchantService } from 'src/merchant/merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantModule } from 'src/merchant/merchant.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TransactionModule,
    MerchantModule
  ],
  providers: [
    ReloadlyService, 
    TransactionService,
    MerchantService
  ],
  controllers: [ReloadlyController],
  exports: [ReloadlyService],
})
export class ReloadlyModule {}
