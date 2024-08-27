import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './schemas/merchant.schema';
export declare class MerchantController {
    private readonly merchantService;
    private logger;
    constructor(merchantService: MerchantService);
    register(createMerchantDto: CreateMerchantDto): Promise<Merchant>;
    findMerchant(merchantId: string): Promise<Merchant>;
    findAllMerchants(): Promise<{
        merchants: Merchant[];
        total: number;
    }>;
    update(merchantId: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant>;
    delete(merchantId: string): Promise<void>;
    getQRCode(clientId: string): Promise<{
        qrCode: string;
    }>;
}
