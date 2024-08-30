import { HttpService } from "@nestjs/axios";
import { ReloadAirtimeDto } from "./dto/reload.airtime.dto";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
export declare class ReloadAirtimeService {
    private httpService;
    private logger;
    private reloadLyBaseURL;
    private accessTokenURL;
    constructor(httpService: HttpService);
    generateAccessToken(): Observable<{
        accessToken: string;
    }>;
    makeTopUp(airDto: ReloadAirtimeDto): any;
    makeAsynchronousTopUp(matDto: ReloadAirtimeDto): Observable<AxiosResponse<ReloadAirtimeDto>>;
    private reloadlyAccessToken;
}
