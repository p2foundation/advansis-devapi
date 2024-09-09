import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
	constructor(
		@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
	) {}

  //create transaction
	async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
		const createdTransaction = new this.transactionModel(createTransactionDto);
		return createdTransaction.save();
	}

  //find all transactions
	async findAll(): Promise<Transaction[]> {
		return this.transactionModel.find().exec();
	}

  //find one transaction
	async findOne(id: string): Promise<Transaction> {
		const transaction = await this.transactionModel.findById(id).exec();
		if (!transaction) {
			throw new NotFoundException(`Transaction #${id} not found`);
		}
		return transaction;
	}

  //update transaction
	async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
		const updatedTransaction = await this.transactionModel
			.findByIdAndUpdate(id, updateTransactionDto, { new: true })
			.exec();
		if (!updatedTransaction) {
			throw new NotFoundException(`Transaction #${id} not found`);
		}
		return updatedTransaction;
	}

  //delete transaction
	async remove(id: string): Promise<Transaction> {
		const deletedTransaction = await this.transactionModel.findByIdAndDelete(id).exec();
		if (!deletedTransaction) {
			throw new NotFoundException(`Transaction #${id} not found`);
		}
		return deletedTransaction;
	}

  //find transactions by user id
	async findByUserId(userId: string): Promise<Transaction[]> {
		return this.transactionModel.find({ userId }).exec();
	}

  //find transactions by type
	async findByType(type: string): Promise<Transaction[]> {
		return this.transactionModel.find({ transactionType: type }).exec();
	}

  //find transactions by status
	async findByStatus(status: string): Promise<Transaction[]> {
		return this.transactionModel.find({ status }).exec();
	}

  //get transaction stats
	async getTransactionStats(userId: string): Promise<any> {
		const stats = await this.transactionModel.aggregate([
			{ $match: { userId } },
			{ $group: {
				_id: '$transactionType',
				count: { $sum: 1 },
				totalAmount: { $sum: '$amount' },
				avgAmount: { $avg: '$amount' }
			}}
		]).exec();
		return stats;
	}
}

