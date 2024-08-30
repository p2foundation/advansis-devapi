import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import { ReloadlyDto } from "./dto/reloadly.dto";
import { AxiosResponse } from "axios";
import { NetworkOperatorsDto } from "./dto/network.operators.dto";
export declare class ReloadlyService {
    private httpService;
    private logger;
    private reloadLyBaseURL;
    private authURL;
    constructor(httpService: HttpService);
    accessToken(): Observable<any>;
    accountBalance(): Observable<AxiosResponse<any>>;
    countryList(): Observable<AxiosResponse<any>>;
    findCountryByCode(reloadDto: ReloadlyDto): Observable<AxiosResponse<ReloadlyDto>>;
    networkOperators(netDto: NetworkOperatorsDto): Observable<AxiosResponse<NetworkOperatorsDto>>;
    findOperatorById(fobDto: NetworkOperatorsDto): Observable<AxiosResponse<NetworkOperatorsDto>>;
    autoDetectOperator(adoDto: NetworkOperatorsDto): Observable<AxiosResponse<NetworkOperatorsDto>>;
    getOperatorByCode(gobcDto: NetworkOperatorsDto): Observable<AxiosResponse<NetworkOperatorsDto>>;
    fxRates(): Promise<any>;
}
