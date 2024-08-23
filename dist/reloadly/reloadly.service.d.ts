import { TransactionService } from '../transaction/transaction.service';
export declare class ReloadlyService {
    private readonly transactionService;
    private axiosInstance;
    private accessToken;
    constructor(transactionService: TransactionService);
    private authenticate;
    topUp(reloadlyDto: any): Promise<any>;
    getOperatorsByCountry(reloadlyDto: any): Promise<any>;
}
