import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { RewardService } from 'src/reward/reward.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private rewardsService;
    private logger;
    constructor(userService: UserService, authService: AuthService, rewardsService: RewardService);
    register(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    login(req: any): Promise<any>;
    genRefreshToken(authHeader: string): Promise<any>;
    getPoints(req: any): Promise<{
        points: number;
    }>;
    getProfile(req: any): Promise<import("./schemas/user.schema").User>;
    updateProfile(req: any, updateData: any): Promise<import("./schemas/user.schema").User>;
    getAllUsers(): Promise<{
        users: import("./schemas/user.schema").User[];
        totalCount: number;
    }>;
    deleteUserById(userId: string): Promise<{
        message: string;
    }>;
    deleteAllUsers(): Promise<{
        message: string;
    }>;
    merchantLogin(loginDto: {
        clientId: string;
        clientKey: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        merchant: {
            id: any;
            clientId: any;
        };
    }>;
    changePassword(req: any, changePasswordDto: {
        currentPassword: string;
        newPassword: string;
    }): Promise<boolean>;
    trackQRCodeUsage(req: any): Promise<import("./schemas/user.schema").User>;
    getQRCodeUsageStats(req: any): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
    scanQRCode(userId: string): Promise<{
        message: string;
    }>;
    generateInvitationLink(req: any): Promise<{
        invitationLink: string;
    }>;
    trackInvitationLinkUsage(invitationLink: string): Promise<{
        message: string;
    }>;
    getInvitationLinkStats(req: any): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
}
