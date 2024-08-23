import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly password?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    readonly GPSAddress?: string;
    readonly clientId?: string;
    readonly clientKey?: string;
    readonly qrCode?: string;
}