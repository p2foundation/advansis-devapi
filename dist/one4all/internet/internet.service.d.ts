import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InternetDto } from './dto/internet.dto';
export declare class InternetService {
    private httpService;
    private logger;
    private DataUrl;
    constructor(httpService: HttpService);
    topupInternetData(transDto: InternetDto): Observable<AxiosResponse<InternetDto>>;
    dataBundleList(transDto: InternetDto): Observable<AxiosResponse<InternetDto>>;
}
