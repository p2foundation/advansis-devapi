import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports:
    [
      MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
      MerchantModule
    ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService, MongooseModule],
})
export class TransactionModule { }
