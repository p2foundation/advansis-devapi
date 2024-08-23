import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { MerchantService } from '../merchant/merchant.service';
import * as crypto from 'crypto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly merchantService: MerchantService,
  ) {}

  async create(transDto: Partial<CreateTransactionDto>): Promise<Transaction> {
    const createdTransaction = new this.transactionModel({
      ...transDto,
      status: 'pending',
      transactionId: this.generateTransactionId(),
    });

    const savedTransaction = await createdTransaction.save();

    if (transDto.referrerClientId) {
      await this.merchantService.updateRewardPoints(transDto.referrerClientId, 5); // Example reward points for a transaction
    }
    return savedTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findOne(transactionId: string): Promise<Transaction> {
    return this.transactionModel.findOne({ transactionId }).exec();
  }

  async update(transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    return this.transactionModel.findOneAndUpdate(
      { transactionId }, 
      updateTransactionDto, 
      { new: true }
    ).exec();
  }

  async delete(transactionId: string): Promise<void> {
    await this.transactionModel.findOneAndDelete({ transactionId }).exec();
  }

  async getTransactionHistory(userId: string, filter?: string): Promise<Transaction[]> {
    const query = { userId };
    if (filter) {
      query['status'] = filter;
    }
    return this.transactionModel.find(query).exec();
  }

  private generateTransactionId(): string {
    return 'txn_' + crypto.randomBytes(4).toString('hex'); // Generates a 8-character hex string
  }
  
}

