import { Model } from 'mongoose';
import { Merchant } from './schemas/merchant.schema';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
export declare class MerchantService {
    private readonly merchantModel;
    constructor(merchantModel: Model<Merchant>);
    create(createMerchantDto: CreateMerchantDto): Promise<Merchant>;
    findOneByClientId(clientId: string): Promise<Merchant | undefined>;
    update(merchantId: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant>;
    delete(merchantId: string): Promise<void>;
    updateLastLogin(merchantId: string): Promise<void>;
    findAllRegisteredMerchants(): Promise<{
        merchants: Merchant[];
        total: number;
    }>;
    updateRewardPoints(clientId: string, points: number): Promise<void>;
    generateQrCode(merchantId: string): Promise<string>;
    viewRewards(merchantId: string): Promise<any>;
}
