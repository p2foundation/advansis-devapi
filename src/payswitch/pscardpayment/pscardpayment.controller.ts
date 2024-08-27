import { Body, Controller, Get, HttpStatus, Logger, Post, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CallbackDto } from "./dto/callback.dto";
import { InlinePayDto } from "./dto/inline.pay.dto";
import { PscardpaymentService } from "./pscardpayment.service";

@ApiTags('cardpayment')
@Controller('api/pscardpayment')
export class PscardpaymentController {
  private logger = new Logger(PscardpaymentController.name);

  constructor(
    private pscardpaymentService: PscardpaymentService
  ) { }

  @Get('redirecturl')
  @ApiOperation({ summary: 'Primary Callback' })
  @ApiResponse({ status: 200, description: 'Transaction response', type: CallbackDto })
  public async primaryCallback(
    @Res() res: Response,
    @Query() qr: CallbackDto
  ): Promise<any> {
    const pc = qr;
    this.logger.log(`TRANSACTION RESPONSE URL => ${JSON.stringify(pc)}`);
    res.status(HttpStatus.OK).json(pc);
  }

  @Post('inline')
  @ApiOperation({ summary: 'Inline Card Mobile Payments' })
  @ApiResponse({ status: 200, description: 'Payment response' })
  public async inlineCardMobilePayments(
    @Body() transDto: InlinePayDto
  ) {
    this.logger.debug(`PAYMENT PAYLOAD => ${transDto}`);
    const icmp = this.pscardpaymentService.inlinePayments(transDto);
    return icmp;
  }
  
}