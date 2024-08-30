import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import {
  RELOADLY_AUDIENCE_SANDBOX,
  RELOADLY_BASEURL,
  RELOADLY_CLIENT_ID_SANDBOX,
  RELOADLY_CLIENT_SECRET_SANDBOX, RELOADLY_GRANT_TYPE_SANDBOX
} from "../../constants";
import * as https from 'https';
import { catchError, map } from "rxjs/operators";
import { AuthenticationDto } from "./dto/authentication.dto";

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);
  private reloadLyBaseURL = RELOADLY_BASEURL;

  constructor(
    private httpService: HttpService
  ) {
  }

  genAccessToken(
    authDto: AuthenticationDto,
  ): Observable<AxiosResponse<AuthenticationDto>> {
    const { grantType, audience } = authDto;

    const authPayload = {
      client_id: RELOADLY_CLIENT_ID_SANDBOX,
      client_secret: RELOADLY_CLIENT_SECRET_SANDBOX ,
      grant_type: RELOADLY_GRANT_TYPE_SANDBOX || grantType,
      audience: RELOADLY_AUDIENCE_SANDBOX  || audience
    };

    const authURL = this.reloadLyBaseURL + `/oauth/token`;

    const configs = {
      url: authURL,
      body: authPayload,
      agent: new https.Agent({
        rejectUnauthorized: false,
      })
    };
    this.logger.log(`access token configs == ${JSON.stringify(configs)}`);

    return this.httpService
      .post(configs.url, configs.body)
      .pipe(
        map((authRes) => {
          this.logger.log(
            `ACCESS TOKEN response ++++ ${JSON.stringify(authRes.data)}`,
          );
          return authRes.data;
        }),
        catchError((authError) => {
          this.logger.error(
            `ACCESS TOKEN ERROR response ---- ${JSON.stringify(
              authError.response.data,
            )}`,
          );
          const authErrorMessage = authError.response.data;
          throw new NotFoundException(authErrorMessage);
        }),
      );
  }
}
