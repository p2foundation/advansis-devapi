import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ReloadlyService } from "./reloadly.service";
import { ReloadlyDto } from "./dto/reloadly.dto";
import { NetworkOperatorsDto } from "./dto/network.operators.dto";

@Controller('api/reloadly')
export class ReloadlyController {
  private logger = new Logger(ReloadlyController.name);

  constructor(
    private readonly reloadlyService: ReloadlyService
  ) { }

  @Get('/account-balance')
  async getAccountBalance(): Promise<any> {
    try {
      const gab = this.reloadlyService.getAccountBalance();
      return gab;
    } catch (error) {
      this.logger.error(`Error getting account balance: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Get('/auth/access-token')
  async getAccessToken(): Promise<any> {
    try {
      const gatRes = await this.reloadlyService.accessToken();
      this.logger.debug(`reloadly access token ===>  ${gatRes}`);
      return gatRes;
    } catch (error) {
      this.logger.error(`Error getting access token: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Get('/countries')
  async listCountryList(): Promise<any> {
    try {
      const lcl = this.reloadlyService.countryList();
      this.logger.log(`${JSON.stringify(lcl)}`);
      return lcl;
    } catch (error) {
      this.logger.error(`Error listing countries: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Post('country/code')
  async findCountryByCode(
    @Body() fcbDto: ReloadlyDto
  ): Promise<any> {
    if (!fcbDto) {
      throw new Error('Invalid input data');
    }
    try {
      const fcb = await this.reloadlyService.findCountryByCode(fcbDto);
      return fcb;
    } catch (error) {
      this.logger.error(`Error finding country by code: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Post('operators')
  async getNetworkGenerator(
    @Body() gngDto: NetworkOperatorsDto
  ): Promise<any> {
    if (!gngDto) {
      throw new Error('Invalid input data');
    }
    try {
      const gng = await this.reloadlyService.networkOperators(gngDto);
      return gng;
    } catch (error) {
      this.logger.error(`Error getting network generator: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Post('/operator/id')
  async findOperatorById(
    @Body() adoDto: NetworkOperatorsDto
  ): Promise<any> {
    if (!adoDto) {
      throw new Error('Invalid input data');
    }
    try {
      const ado = this.reloadlyService.findOperatorById(adoDto);
      return ado;
    } catch (error) {
      this.logger.error(`Error finding operator by id: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Post('/operator/autodetect')
  async autoDetectOperator(
    @Body() adoDto: NetworkOperatorsDto
  ): Promise<any> {
    if (!adoDto) {
      throw new Error('Invalid input data');
    }
    try {
      const accessToken = await this.getAccessToken();
      this.logger.debug(`access token <:::> ${JSON.stringify(accessToken)}`);
      const ado = await this.reloadlyService.autoDetectOperator(adoDto);
      this.logger.debug(`network autodetect input ==>${JSON.stringify(adoDto)}`);
      return ado;
    } catch (error) {
      this.logger.error(`Error auto detecting operator: ${error}`);
      // Return an error response or throw an exception
    }
  }

  @Post('/operator/country-code')
  async getNetworkOperatorByCode(
    @Body() gnobcDto: NetworkOperatorsDto
  ): Promise<any> {
    if (!gnobcDto) {
      throw new Error('Invalid input data');
    }
    try {
      const gnobc = await this.reloadlyService.getOperatorByCode(gnobcDto);
      return gnobc;
    } catch (error) {
      this.logger.error(`Error getting network operator by code: ${error}`);
      // Return an error response or throw an exception
    }
  }

  // private async getAccessToken(): Promise<any> {
  //   try {
  //     const newAccess = await this.reloadlyService.accessToken();
  //     this.logger.debug(`access token <:::> ${JSON.stringify(newAccess)}`);
  //     return newAccess;
  //   } catch

  // }
}