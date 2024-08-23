import { ReloadlyService } from './reloadly.service';
import { CountryReloadlyDto } from './dto/country-reloadly.dto';
export declare class ReloadlyController {
    private readonly reloadlyService;
    constructor(reloadlyService: ReloadlyService);
    topUp(reloadlyDto: CountryReloadlyDto): Promise<any>;
    getOperatorsByCountry(countryCode: string): Promise<any>;
}
