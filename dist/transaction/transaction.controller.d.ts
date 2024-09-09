import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./schemas/transaction.schema").Transaction>;
    findAll(): Promise<import("./schemas/transaction.schema").Transaction[]>;
    findOne(id: string): Promise<import("./schemas/transaction.schema").Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("./schemas/transaction.schema").Transaction>;
    remove(id: string): Promise<import("./schemas/transaction.schema").Transaction>;
    findByUserId(userId: string): Promise<import("./schemas/transaction.schema").Transaction[]>;
    findByType(type: string): Promise<import("./schemas/transaction.schema").Transaction[]>;
    findByStatus(status: string): Promise<import("./schemas/transaction.schema").Transaction[]>;
    getTransactionStats(userId: string): Promise<any>;
}
