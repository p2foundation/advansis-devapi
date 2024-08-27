import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirtimeService } from './airtime.service';
import { TopupDto } from './dto/topup.dto';
import { TransStatusDto } from './dto/transtatus.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Airtime')
@Controller('api/v1/airtime')
export class AirtimeController {
  private logger = new Logger(AirtimeController.name);

  constructor(private airtimeService: AirtimeService) {}

  @Get('testopup')
  @ApiOperation({ summary: 'Test airtime top-up' })
  @ApiResponse({ status: 200, description: 'Airtime top-up processing...' })
  testAirtime(): string {
    return `Airtime top-up processing ...`;
  }

  @Post('/transtatus')
  @ApiOperation({ summary: 'Query transaction status' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['transactionId'],
      properties: {
        transactionId: {
          type: 'string',
          description: 'Client transactionId',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Transaction status retrieved successfully',
  })
  public async queryTransactionstatus(
    @Body() qtsDto: TransStatusDto,
  ): Promise<any> {
    this.logger.log(`transtatus dto => ${JSON.stringify(qtsDto)}`);
    const ts = await this.airtimeService.transactionStatus(qtsDto);
    return ts;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/topup')
  @ApiOperation({ summary: 'Process airtime top-up' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['recipientNumber', 'amount', 'network'],
      properties: {
        recipientNumber: {
          type: 'string',
          description: 'The recipient phone number',
          pattern: '^\\+?[1-9]\\d{1,14}$',
        },
        amount: {
          type: 'number',
          description: 'The amount to be transferred',
          minimum: 1,
        },
        network: {
          type: 'string',
          description: 'The recipient mobile network provider',
          enum: ['airtel', 'mtn', 'glo', '9mobile'],
        },
        userId: {
          type: 'string',
          description: 'The user ID',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Airtime top-up processed successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid userId' })
  public async processTopup(
    @Body() ptDto: TopupDto,
    @Request() req,
  ): Promise<any> {
    this.logger.log(`topup airtime dto => ${JSON.stringify(ptDto)}`);
    this.logger.debug(`topup request() => ${JSON.stringify(req.user)}`);
    ptDto.userId = req.user.sub;
    // Validate userId
    if (!ptDto.userId || typeof ptDto.userId !== 'string') {
      throw new BadRequestException('Invalid userId');
    }
    return this.airtimeService.topupAirtimeService(ptDto);
  }

}