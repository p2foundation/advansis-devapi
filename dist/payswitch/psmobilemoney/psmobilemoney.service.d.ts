import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { TransferMobileMoneyDto } from './dto/transfer.mobilemoney.dto';
import { PayMobileMoneyDto } from './dto/pay.mobilemoney.dto';
export declare class PsmobilemoneyService {
    private httpService;
    private logger;
    constructor(httpService: HttpService);
    primaryCallbackUrl(): void;
    transferMobilemoney(transDto: TransferMobileMoneyDto): Observable<AxiosResponse<TransferMobileMoneyDto>>;
    mobileMoneyPayment(transDto: PayMobileMoneyDto): Observable<AxiosResponse<PayMobileMoneyDto>>;
}
