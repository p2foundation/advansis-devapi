import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { PrymoService } from './prymo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MerchantAuthGuard } from 'src/auth/merchant-auth.guard';

@ApiTags('Prymo')
@ApiBearerAuth()
@Controller('prymo')
export class PrymoController {
  constructor(
    private readonly prymoService: PrymoService
) {}

  @UseGuards(JwtAuthGuard, MerchantAuthGuard)
  @Post('topup')
  @ApiOperation({ summary: 'Perform a top-up with Prymo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '233XXXXXXXXX' },
        operatorId: { type: 'string', example: '1234' },
        amount: { type: 'number', example: 10 },
        userId: { type: 'string', example: 'userId123' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Top-up successful' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async topUp(
    @Body('phoneNumber') phoneNumber: string,
    @Body('operatorId') operatorId: string,
    @Body('amount') amount: number,
    @Body('userId') userId: string,
  ) {
    return this.prymoService.topUp(phoneNumber, operatorId, amount, userId);
  }

  @UseGuards(JwtAuthGuard, MerchantAuthGuard)
  @Get('operators')
  @ApiOperation({ summary: 'Get available operators from Prymo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'userId123' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Operators retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getOperators(@Body('userId') userId: string) {
    return this.prymoService.getOperators(userId);
  }

  @UseGuards(JwtAuthGuard, MerchantAuthGuard)
  @Post('sms')
  @ApiOperation({ summary: 'Send SMS using Prymo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '233XXXXXXXXX' },
        message: { type: 'string', example: 'Your airtime top-up was successful.' },
        userId: { type: 'string', example: 'userId123' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'SMS sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async sendSMS(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
    @Body('userId') userId: string,
  ) {
    return this.prymoService.sendSMS(phoneNumber, message, userId);
  }
}
