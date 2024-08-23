import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { TransStatusDto } from './dto/transtatus.dto';
import { TopupDto } from './dto/topup.dto';
import { TransactionService } from 'src/transaction/transaction.service';
export declare class AirtimeService {
    private readonly httpService;
    private readonly transService;
    private logger;
    private AirBaseUrl;
    constructor(httpService: HttpService, transService: TransactionService);
    transactionStatus(transDto: TransStatusDto): Observable<AxiosResponse<TransStatusDto>>;
    topupAirtimeService(transDto: TopupDto): Observable<AxiosResponse<TopupDto>>;
}
