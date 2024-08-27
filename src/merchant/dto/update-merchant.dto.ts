import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {
    readonly name?: string;
    readonly email?: string;
    readonly phoneNumber?: string;
    readonly password?: string;
    readonly city?: string;
    street?: string;
    ghanaPostGPS?: string;
    state?: string;
    zip?: string;
    country?: string;
}