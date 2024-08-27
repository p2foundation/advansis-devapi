import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { MerchantService } from '../merchant/merchant.service';
export declare class TransactionService {
    private transactionModel;
    private readonly merchantService;
    constructor(transactionModel: Model<TransactionDocument>, merchantService: MerchantService);
    create(createTransactionDto: Partial<CreateTransactionDto>): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(transactionId: string): Promise<Transaction>;
    update(transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    delete(transactionId: string): Promise<void>;
    private generateTransactionId;
}
