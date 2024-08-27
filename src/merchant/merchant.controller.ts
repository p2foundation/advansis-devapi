import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Moved ApiOperation here
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Merchant } from './schemas/merchant.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('merchants')
@Controller('api/v1/merchants')
export class MerchantController {
    private logger = new Logger(MerchantController.name);

    constructor(private readonly merchantService: MerchantService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new merchant' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created', type: Merchant })
    @ApiBody({
        description: 'Merchant registration details',
        schema: {
            type: 'object',
            required: ['name', 'email', 'phoneNumber', 'password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'The name of the merchant',
                },
                email: {
                    type: 'string',
                    description: 'Email address of the merchant',
                },
                phoneNumber: {
                    type: 'string',
                    description: 'Phone number of the merchant',
                },
                password: {
                    type: 'string',
                    description: 'Password for the merchant account',
                },
                street: {
                    type: 'string',
                    description: 'Street address of the merchant',
                },
                city: {
                    type: 'string',
                    description: 'City of the merchant',
                },
                ghanaPostGPS: {
                    type: 'string',
                    description: 'Ghana Post GPS location of the merchant',
                },
                state: {
                    type: 'string',
                    description: 'State of the merchant',
                },
                zip: {
                    type: 'string',
                    description: 'Zip code of the merchant',
                },
                country: {
                    type: 'string',
                    description: 'Country of the merchant',
                },
                // Add other properties as needed
            },
        },
    })
    async register(
        @Body() createMerchantDto: CreateMerchantDto
    ): Promise<Merchant> {
        return this.merchantService.create(createMerchantDto);
    }

    @ApiOperation({ summary: 'Find a merchant by ID' })
    @ApiResponse({ status: 200, description: 'The found merchant', type: Merchant })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    async findMerchant(@Param('id') merchantId: string): Promise<Merchant> {
        return this.merchantService.findOneByClientId(merchantId);
    }

    @ApiOperation({ summary: 'Find all registered merchants' })
    @ApiResponse({ status: 200, description: 'List of merchants', type: [Merchant] })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async findAllMerchants(): Promise<{ merchants: Merchant[]; total: number }> {
        return this.merchantService.findAllRegisteredMerchants();
    }

    @ApiOperation({ summary: 'Update a merchant' })
    @ApiResponse({ status: 200, description: 'The updated merchant', type: Merchant })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    async update(
        @Param('id') merchantId: string,
        @Body() updateMerchantDto: UpdateMerchantDto
    ): Promise<Merchant> {
        return this.merchantService.update(merchantId, updateMerchantDto);
    }

    @ApiOperation({ summary: 'Delete a merchant' })
    @ApiResponse({ status: 200, description: 'Merchant has been successfully removed' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id') merchantId: string) {
        return this.merchantService.delete(merchantId);
    }

    @ApiOperation({ summary: 'Get a merchant QR code' })
    @ApiResponse({ status: 200, description: 'QR code of the merchant', type: String })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':clientId/qrcode')
    async getQRCode(@Param('clientId') clientId: string) {
        const merchant = await this.merchantService.findOneByClientId(clientId);
        return { qrCode: merchant.qrCode };
    }

}