import { TransactionService } from '../transaction/transaction.service';
export declare class PrymoService {
    private readonly transactionService;
    private axiosInstance;
    constructor(transactionService: TransactionService);
    topUp(phoneNumber: string, operatorId: string, amount: number, userId: string): Promise<any>;
    getOperators(userId: string): Promise<any>;
    sendSMS(phoneNumber: string, message: string, userId: string): Promise<any>;
}
