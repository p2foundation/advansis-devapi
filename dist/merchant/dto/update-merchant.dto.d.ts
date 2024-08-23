import { CreateMerchantDto } from './create-merchant.dto';
declare const UpdateMerchantDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMerchantDto>>;
export declare class UpdateMerchantDto extends UpdateMerchantDto_base {
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
export {};
