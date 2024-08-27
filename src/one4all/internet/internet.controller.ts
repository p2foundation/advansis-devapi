import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternetDto } from './dto/internet.dto';
import { InternetService } from './internet.service';

@ApiTags('internet')
@Controller('api/v1/internet')
export class InternetController {
  private logger = new Logger('InternetController');

  constructor(private internetService: InternetService) { }
  @Post('/buydata')
  @ApiOperation({ summary: 'Buy internet data' })
  @ApiBody({ type: InternetDto })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async buyInternetData(
    @Body() bidDto: InternetDto
  ): Promise<any> {
    this.logger.log(`INTERNET DATA dto => ${JSON.stringify(bidDto)}`);
    const ts = await this.internetService.topupInternetData(bidDto);
    return ts;
  }

  @Post('/bundlelist')
  @ApiOperation({ summary: 'List data bundles' })
  @ApiBody({ type: InternetDto })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  public async listDataBundle(
    @Body() ldbDto: InternetDto
  ): Promise<any> {
    this.logger.log(`BUNDLE LIST dto => ${JSON.stringify(ldbDto)}`);
    const ta = await this.internetService.dataBundleList(ldbDto);
    return ta;
  }

}
