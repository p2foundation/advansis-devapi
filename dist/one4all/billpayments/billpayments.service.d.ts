import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BillpaymentDto } from './dto/billpayments.dto';
export declare class BillpaymentsService {
    private httpService;
    private logger;
    private DataUrl;
    constructor(httpService: HttpService);
    topupInternetBundle(transDto: BillpaymentDto): Observable<AxiosResponse<BillpaymentDto>>;
    dataBundleList(transDto: BillpaymentDto): Observable<AxiosResponse<BillpaymentDto>>;
}
