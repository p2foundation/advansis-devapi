import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./schemas/transaction.schema").Transaction>;
    findAll(): Promise<import("./schemas/transaction.schema").Transaction[]>;
    findOne(transactionId: string): Promise<import("./schemas/transaction.schema").Transaction>;
    getTransactionHistory(userId: string, filter?: string): Promise<import("./schemas/transaction.schema").Transaction[]>;
    update(transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<import("./schemas/transaction.schema").Transaction>;
    delete(transactionId: string): Promise<void>;
}
