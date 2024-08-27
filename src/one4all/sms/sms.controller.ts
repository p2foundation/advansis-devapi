import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { SmsDto } from './dto/sms.dto';
import { SmsService } from './sms.service';

@ApiTags('SMS') // Tag for grouping related endpoints in Swagger UI
@Controller('api/v1/sms')
export class SmsController {
    private logger = new Logger(SmsController.name);

    constructor(
        private smsService: SmsService,
    ) { }

    @Post('sendsms')
    @ApiOperation({ summary: 'Send SMS' }) // Description for the endpoint
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                recipient: { type: 'number' },
                message: { type: 'string' },
                senderId: { type: 'string' },
                clientReference: { type: 'string' }
            },
            required: ['recipient', 'message', 'senderId'] // Specify required properties
        }
    })
    public async sendSms(
        @Body() transDto: SmsDto
    ) {
        const s2 = await this.smsService.SendSMS(transDto);
        return s2;
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Send Bulk SMS' }) // Description for the endpoint
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                recipient: { type: 'number' },
                message: { type: 'string' },
                senderId: { type: 'string' },
                clientReference: { type: 'string' }
            },
            required: ['recipient', 'message', 'senderId'] // Specify required properties
        }
    })
    public async sendBulkSms(
        @Body() transDto: SmsDto
    ): Promise<any> {
        const sbs = await this.smsService.postBulkSMS(transDto);
        return sbs;
    }

}


