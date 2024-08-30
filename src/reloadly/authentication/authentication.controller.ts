import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { TransStatusDto } from "../../one4all/airtime/dto/transtatus.dto";
import { AuthenticationDto } from "./dto/authentication.dto";

@Controller('api/auth')
export class AuthenticationController {
  private logger = new Logger(AuthenticationController.name);

  constructor(
    private authService: AuthenticationService
  ) {
  }

  @Post('/access-token')
  public async genAuthentication(
    @Body() authDto: AuthenticationDto,
  ): Promise<any> {
    this.logger.log(`auth dto => ${JSON.stringify(authDto)}`);
    const authToken = await this.authService.genAccessToken(authDto);
    return authToken;
  }


}
