import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './schemas/merchant.schema';
export declare class MerchantController {
    private readonly merchantService;
    constructor(merchantService: MerchantService);
    register(createMerchantDto: CreateMerchantDto): Promise<Merchant>;
    findMerchant(merchantId: string): Promise<Merchant>;
    findAllMerchants(): Promise<{
        merchants: Merchant[];
        total: number;
    }>;
    generateQrCode(merchantId: string): Promise<string>;
    viewRewards(merchantId: string): Promise<any>;
    update(merchantId: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant>;
    delete(merchantId: string): Promise<void>;
    getQRCode(clientId: string): Promise<{
        qrCode: string;
    }>;
}
