import { Model } from 'mongoose';
import { Merchant, MerchantDocument } from './schemas/merchant.schema';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class MerchantService {
    private readonly merchantModel;
    private userService;
    private authService;
    constructor(merchantModel: Model<MerchantDocument>, userService: UserService, authService: AuthService);
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
    changePassword(clientId: string, currentPassword: string, newPassword: string): Promise<void>;
    trackQRCodeUsage(clientId: string): Promise<Merchant>;
    getQRCodeUsageStats(clientId: string): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
    generateInvitationLink(merchantId: string): Promise<string>;
    trackInvitationLinkUsage(invitationLink: string): Promise<Merchant>;
    getInvitationLinkStats(clientId: string): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
}
