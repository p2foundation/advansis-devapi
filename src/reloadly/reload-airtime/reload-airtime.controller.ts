import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ReloadAirtimeService } from './reload-airtime.service';
import { ReloadAirtimeDto } from './dto/reload.airtime.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reload Airtime')
@Controller('api/v1/reload-airtime')
export class ReloadAirtimeController {
  private logger = new Logger(ReloadAirtimeController.name);

  constructor(
    private reloadAirtimeService: ReloadAirtimeService
  ) {}

  @ApiOperation({ summary: 'Generate access token' })
  @ApiResponse({ status: 200, description: 'Access token generated successfully' })
  @Get('/token')
  public async getAccessToken(): Promise<any> {
    const gatRes = this.reloadAirtimeService.generateAccessToken();
    console.log(`access token response:::  ${gatRes}`);
    return gatRes;
  }

  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({ status: 200, description: 'Test successful' })
  @Get('/test')
  public testReloadLyAirtime(): string {
    return `we made it ...`;
  }

  @ApiOperation({ summary: 'Recharge airtime' })
  @ApiBody({ type: ReloadAirtimeDto })
  @ApiResponse({ status: 200, description: 'Airtime recharged successfully' })
  @Post('recharge')
  public async airtimeRecharge(
    @Body() airDto: ReloadAirtimeDto
  ): Promise<any> {
    console.debug(`airtime dto ==> ${airDto}`);
    const ar = this.reloadAirtimeService.makeTopUp(airDto);
    return ar;
  }

  @ApiOperation({ summary: 'Recharge airtime asynchronously' })
  @ApiBody({ type: ReloadAirtimeDto })
  @ApiResponse({ status: 200, description: 'Asynchronous airtime recharge initiated' })
  @Post('/recharge-async')
  public async asyncAirtimeRecharge(
    @Body() aarDto: ReloadAirtimeDto
  ): Promise<any> {
    this.logger.debug(`async airtime recharge Dto ==> ${aarDto}`);
    const aar = this.reloadAirtimeService.makeAsynchronousTopUp(aarDto);
    return aar;
  }
}
