import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger'; // Moved ApiOperation here
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Merchant } from './schemas/merchant.schema';

@ApiTags('merchants')
@Controller('api/v1/merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @ApiOperation({ summary: 'Register a new merchant' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created',
    type: Merchant,
  })
  @ApiResponse({ status: 400, description: 'Bad request', type: String })
  @ApiResponse({
    status: 409,
    description: 'Merchant already registered',
    type: String,
  })
  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Merchant Name' },
        email: { type: 'string', example: 'merchant@example.com' },
        phone: { type: 'string', example: '123-456-7890' },
        address: { type: 'string', example: '123 Merchant St' },
        city: { type: 'string', example: 'Merchant City' },
        state: { type: 'string', example: 'Merchant State' },
        zipCode: { type: 'string', example: '12345' },
        country: { type: 'string', example: 'Merchant Country' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['name', 'email', 'phone', 'password'],
    },
  })
  async register(
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantService.create(createMerchantDto);
  }

  @ApiOperation({ summary: 'Find a merchant by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found merchant',
    type: Merchant,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findMerchant(@Param('id') merchantId: string): Promise<Merchant> {
    return this.merchantService.findOneByClientId(merchantId);
  }

  @ApiOperation({ summary: 'Find all registered merchants' })
  @ApiResponse({
    status: 200,
    description: 'List of merchants',
    type: [Merchant],
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAllMerchants(): Promise<{ merchants: Merchant[]; total: number }> {
    return this.merchantService.findAllRegisteredMerchants();
  }

  @Get('qrcode')
  @ApiOperation({ summary: 'Generate QR code for merchant' })
  @ApiResponse({ status: 200, description: 'QR code generated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  async generateQrCode(@Query('merchantId') merchantId: string) {
    return this.merchantService.generateQrCode(merchantId);
  }

  @Get('rewards')
  @ApiOperation({ summary: 'View merchant rewards' })
  @ApiResponse({ status: 200, description: 'Rewards list retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  async viewRewards(@Query('merchantId') merchantId: string) {
    return this.merchantService.viewRewards(merchantId);
  }

  @ApiOperation({ summary: 'Update a merchant' })
  @ApiResponse({
    status: 200,
    description: 'The updated merchant',
    type: Merchant,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') merchantId: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantService.update(merchantId, updateMerchantDto);
  }

  @ApiOperation({ summary: 'Delete a merchant' })
  @ApiResponse({
    status: 200,
    description: 'Merchant has been successfully removed',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') merchantId: string) {
    return this.merchantService.delete(merchantId);
  }

  @ApiOperation({ summary: 'Get a merchant QR code' })
  @ApiResponse({
    status: 200,
    description: 'QR code of the merchant',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':clientId/qrcode')
  async getQRCode(@Param('clientId') clientId: string) {
    const merchant = await this.merchantService.findOneByClientId(clientId);
    return { qrCode: merchant.qrCode };
  }
}
