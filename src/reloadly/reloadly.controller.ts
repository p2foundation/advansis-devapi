import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ReloadlyService } from './reloadly.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MerchantAuthGuard } from 'src/auth/merchant-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountryReloadlyDto } from './dto/country-reloadly.dto';

@ApiTags('reloadly')
@Controller('api/v1/reloadly')
export class ReloadlyController {
  constructor(private readonly reloadlyService: ReloadlyService) {}

  @ApiOperation({ summary: 'Top-up a phone number' })
  @ApiResponse({ status: 200, description: 'Top-up successful', type: Object })
  @UseGuards(JwtAuthGuard, MerchantAuthGuard)
  @ApiBearerAuth()
  @Post('topup')
  async topUp(
    @Body() reloadlyDto: CountryReloadlyDto
  ) {
    return this.reloadlyService.topUp(reloadlyDto);
  }

  @ApiOperation({ summary: 'Get operators by country code' })
  @ApiResponse({ status: 200, description: 'Operators list', type: [Object] })
  @UseGuards(JwtAuthGuard, MerchantAuthGuard)
  @ApiBearerAuth()
  @Get('operators')
  async getOperatorsByCountry(@Query('countryCode') countryCode: string) {
    return this.reloadlyService.getOperatorsByCountry(countryCode);
  }
}
