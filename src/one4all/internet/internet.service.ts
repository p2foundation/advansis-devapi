import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import * as https from 'https';
import {
  ONE4ALL_APIKEY,
  ONE4ALL_APISECRET,
  ONE4ALL_BASEURL,
  ONE4ALL_RETAILER,
} from 'src/constants';
import { InternetDto } from './dto/internet.dto';
import { GeneratorUtil } from 'src/utilities/generator.util';

@Injectable()
export class InternetService {
  private logger = new Logger('InternetService');
  private DataUrl = ONE4ALL_BASEURL;

  constructor(private httpService: HttpService) {}

  topupInternetData(
    transDto: InternetDto,
  ): Observable<AxiosResponse<InternetDto>> {
    const { retailer, recipientNumber, dataCode, network, transId } = transDto;

    const tibParams = {
      retailer: ONE4ALL_RETAILER || retailer,
      recipient: recipientNumber || '',
      data_code: dataCode || '',
      network: 0 || network,
      trxn: GeneratorUtil.generateTransactionId() || '',
    };

    // https://tppgh.myone4all.com/api/TopUpApi/dataBundle?retailer=233245000000&recipient=233245667942&data_code=DAILY_20MB&network=4&trxn=1234567890

    const tibUrl =
      this.DataUrl +
      `/TopUpApi/dataBundle?retailer=${tibParams.retailer}&recipient=${tibParams.recipient}&data_code=${tibParams.data_code}&network=${tibParams.network}&trxn=${tibParams.trxn}`;

    const configs = {
      url: tibUrl,
      headers: { ApiKey: ONE4ALL_APIKEY, ApiSecret: ONE4ALL_APISECRET },
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    this.logger.log(
      `INTERNET DATA BUNDLE payload config ==> ${JSON.stringify(configs)}`,
    );
    return this.httpService
      .get(configs.url, { httpsAgent: configs.agent, headers: configs.headers })
      .pipe(
        map((tibRes) => {
          this.logger.verbose(
            `INTERNET DATA BUNDLE server response => ${tibRes.data}`,
          );

          return tibRes.data;
        }),
        catchError((tibError) => {
          this.logger.error(`ERROR INTERNET DATA BUNDLE => ${JSON.stringify(tibError.data)}`);

          const tibErrorMessage = tibError.response.data;
          throw new NotFoundException(tibErrorMessage);
        }),
      );
  }

  dataBundleList(
    transDto: InternetDto,
  ): Observable<AxiosResponse<InternetDto>> {
    // const { network } = transDto;
    const dblParams: any = { network: 0 || transDto.network };

    // https://tppgh.myone4all.com/api/TopUpApi/dataBundleList?network=0
    const dblURL =
      this.DataUrl + `/TopUpApi/dataBundleList?network=${dblParams.network}`;

    const configs = {
      url: dblURL,
      headers: { ApiKey: ONE4ALL_APIKEY, ApiSecret: ONE4ALL_APISECRET },
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    this.logger.log(
      `DATA BUNDLE LIST payload config ==> ${JSON.stringify(configs)}`,
    );
    return this.httpService
      .get(configs.url, { httpsAgent: configs.agent, headers: configs.headers })
      .pipe(
        map((dblRes) => {
          this.logger.verbose(
            `DATA BUNDLE lIST server response => ${dblRes.data}`,
          );

          return dblRes.data;
        }),
        catchError((dblError) => {
          this.logger.error(`ERROR DATA BUNDLE LIST => ${JSON.stringify(dblError.response.data)}`);

          const dblErrorMessage = dblError.response.data;
          throw new NotFoundException(dblErrorMessage);
        }),
      );
  }
}
