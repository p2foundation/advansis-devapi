import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import {
  RELOADLY_AUDIENCE_SANDBOX,
  RELOADLY_BASEURL,
  RELOADLY_BASEURL_SANDBOX,
  RELOADLY_CLIENT_ID_SANDBOX,
  RELOADLY_CLIENT_SECRET_SANDBOX,
  RELOADLY_GRANT_TYPE_SANDBOX,
  RELOADLY_TOKEN_SANDBOX
} from "../../constants";
import { HttpService } from "@nestjs/axios";
import { catchError, map } from "rxjs/operators";
import { ReloadAirtimeDto } from "./dto/reload.airtime.dto";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { GeneratorUtil } from "src/utilities/generator.util";

@Injectable()
export class ReloadAirtimeService {
  private logger = new Logger(ReloadAirtimeService.name);
  private reloadLyBaseURL = RELOADLY_BASEURL_SANDBOX;
  private accessTokenURL = process.env.RELOADLY_BASEURL || RELOADLY_BASEURL;
  // private accessToken: string;

  constructor(
    private httpService: HttpService
  ) {
  }

  public generateAccessToken(): Observable<{ accessToken: string }> {
    const gatPayload = {
      client_id: process.env.RELOADLY_CLIENT_ID_SANDBOX || RELOADLY_CLIENT_ID_SANDBOX,
      client_secret: process.env.RELOADLY_CLIENT_SECRET_SANDBOX || RELOADLY_CLIENT_SECRET_SANDBOX,
      grant_type: process.env.RELOADLY_GRANT_TYPE_SANDBOX || RELOADLY_GRANT_TYPE_SANDBOX,
      audience: process.env.RELOADLY_AUDIENCE_SANDBOX || RELOADLY_AUDIENCE_SANDBOX
    };

    const gatURL = `${this.accessTokenURL}/oauth/token`;

    const configs = {
      url: gatURL,
      body: gatPayload
    };
    this.logger.log(`Access token http configs == ${JSON.stringify(configs)}`);

    return this.httpService
      .post(configs.url, configs.body)
      .pipe(
        map((gatRes) => {
          this.logger.debug(`ACCESS TOKEN HTTPS RESPONSE ++++ ${JSON.stringify(gatRes.data)}`);
          return { accessToken: gatRes.data.access_token };
        }),
        catchError((gatError) => {
          this.logger.error(`ERROR ACCESS TOKEN RESPONSE --- ${JSON.stringify(gatError.response.data)}`);
          throw new NotFoundException(gatError.response.data);
        })
      );
  }


  public makeTopUp(airDto: ReloadAirtimeDto): any {
    // get access token for authentication
    this.reloadlyAccessToken().then(token => {
      this.logger.debug(`...loading token::: ${token}`);
      const rAccessToken = token;
  
      const {
        operatorId,
        amount,
        recipientEmail,
        recipientNumber,
        senderNumber,
        recipientCountryCode
      } = airDto;
  
      // token payload
      const mtPayload = {
        operatorId,
        amount,
        useLocalAmount: false,
        customIdentifier: GeneratorUtil.generateTransactionId(),
        recipientEmail,
        recipientPhone: {
          countryCode: recipientCountryCode,
          number: recipientNumber
        },
        senderPhone: {
          countryCode: airDto.senderCountryCode,
          number: senderNumber
        }
  
      };
  
      // Access URL
      const mtURL = `https://topups-sandbox.reloadly.com/topups`;
      // const token = RELOADLY_TOKEN_SANDBOX; // Not needed
  
      // https config
      const config = {
        url: mtURL,
        body: mtPayload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/com.reloadly.topups-v1+json",
          Authorization: `Bearer ${rAccessToken}`
        }
  
      };
  
      this.logger.log(`Access token http configs == ${JSON.stringify(config)}`);
  
      return this.httpService
        .post(config.url, config.body, { headers: config.headers })
        .pipe(
          map((mtRes) => {
            this.logger.debug(`MAKE TOPUP RESPONSE ++++ ${JSON.stringify(mtRes.data)}`);
            return mtRes.data;
          }),
          catchError((mtError) => {
            this.logger.error(`ERROR ACCESS TOKEN RESPONSE --- ${JSON.stringify(
              mtError.response.data)}`
            );
            const mtErrorMessage = mtError.response.data;
            throw new NotFoundException(mtErrorMessage);
          })
        );
    }).catch(error => {
      this.logger.error(`Error generating access token: ${error.message}`);
      throw new NotFoundException('Failed to generate access token');
    });
  }

  public makeAsynchronousTopUp(matDto: ReloadAirtimeDto): Observable<AxiosResponse<ReloadAirtimeDto>> {
    // get access token for authentication
    let rAccessToken = this.reloadlyAccessToken();

    const {
      operatorId,
      amount,
      recipientEmail,
      recipientNumber,
      senderNumber,
      recipientCountryCode
    } = matDto;

    const matPayload = {
      operatorId,
      amount,
      useLocalAmount: false,
      customIdentifier: GeneratorUtil.generateTransactionId(),
      recipientEmail,
      recipientPhone: {
        countryCode: recipientCountryCode,
        number: recipientNumber
      },
      senderPhone: {
        countryCode: matDto.senderCountryCode,
        number: senderNumber
      }
    };

    // Access URL
    const matURL = `https://topups-sandbox.reloadly.com/topups-async`;

    // https config
    const config = {
      url: matURL,
      body: matPayload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/com.reloadly.topups-v1+json",
        Authorization: `Bearer ${rAccessToken}`
      }
    };

    this.logger.log(`Make Async TopUp configs == ${JSON.stringify(config)}`);

    return this.httpService
      .post(config.url, config.body, { headers: config.headers })
      .pipe(
        map((matRes) => {
          this.logger.debug(`MAKE ASYNC TOP-UP RESPONSE ++++ ${JSON.stringify(matRes.data)}`);
          return matRes.data;
        }),
        catchError((matError) => {
          this.logger.error(`MAKE ASYNC TOP-UP ERROR --- ${JSON.stringify(
              matError.response.data
            )}`
          );
          const matErrorMessage = matError.response.data;
          throw new NotFoundException(matErrorMessage);
        })
      );
  }

  private async reloadlyAccessToken(): Promise<string> {
    const tokenPayload = {
      client_id: RELOADLY_CLIENT_ID_SANDBOX,
      client_secret: RELOADLY_CLIENT_SECRET_SANDBOX,
      grant_type: RELOADLY_GRANT_TYPE_SANDBOX,
      audience: RELOADLY_AUDIENCE_SANDBOX,
    };

    const tokenUrl = `${this.accessTokenURL}/oauth/token`;

    try {
      const response = await this.httpService.post(tokenUrl, tokenPayload).toPromise();
      const accessToken = response.data.access_token;
      // this.logger.debug(`Access token generated: ${accessToken}`);
      return accessToken;
    } catch (error) {
      this.logger.error(`Error generating access token: ${error.message}`);
      throw new NotFoundException('Failed to generate access token');
    }
  }

}
