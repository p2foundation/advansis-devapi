import { Controller, Res, Query, Get, Post, Body, HttpStatus, Logger } from '@nestjs/common';
import { PsmobilemoneyService } from './psmobilemoney.service';
import { Response } from 'express'
import { TransferMobileMoneyDto } from './dto/transfer.mobilemoney.dto';
import { PayMobileMoneyDto } from './dto/pay.mobilemoney.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('PS Mobile Money')
@Controller('api/v1/psmobilemoney')
export class PsmobilemoneyController {
    private logger = new Logger(PsmobilemoneyController.name);

    constructor(private psMobilemoneyService: PsmobilemoneyService) { }

    @Post('transfermoney')
    @ApiOperation({ summary: 'Transfer mobile money' })
    @ApiBody({ type: TransferMobileMoneyDto, description: 'Transfer mobile money request body' })
    @ApiResponse({ status: 201, description: 'Mobile money transferred successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    public async creditWallet(
        @Body() transDto: TransferMobileMoneyDto,
    ) {
        const cw = await this.psMobilemoneyService.transferMobilemoney(transDto);
        return cw;
    }

    @Post('debitwallet')
    @ApiOperation({ summary: 'Debit mobile money' })
    @ApiBody({ type: PayMobileMoneyDto, description: 'Debit mobile money request body' })
    @ApiResponse({ status: 201, description: 'Mobile money debited successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    public async debitWallet(
        @Body() transDto: PayMobileMoneyDto,
    ) {
        console.log(`${transDto}`)
        const dw = await this.psMobilemoneyService.mobileMoneyPayment(transDto);
        this.logger.debug(`db money init response ===> ${JSON.stringify(dw)}`);
        return dw;
    }
}