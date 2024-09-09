import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../utilities/email.service';
import { NodemailService } from '../utilities/nodemail.service';
import { SmsService } from 'src/utilities/sms.util';
import { GravatarService } from 'src/utilities/gravatar.util';
import { MerchantService } from 'src/merchant/merchant.service';
export declare class UserService {
    private userModel;
    private emailService;
    private nodemailService;
    private smsService;
    private gravatarService;
    private readonly merchantService;
    private logger;
    constructor(userModel: Model<UserDocument>, emailService: EmailService, nodemailService: NodemailService, smsService: SmsService, gravatarService: GravatarService, merchantService: MerchantService);
    create(userDto: CreateUserDto): Promise<User>;
    findOneByUsername(username: string): Promise<User | undefined>;
    findOneById(userId: string): Promise<User | undefined>;
    updateProfile(userId: string, updateData: any): Promise<User>;
    addPoints(userId: string, points: number): Promise<User>;
    findAll(): Promise<{
        users: User[];
        totalCount: number;
    }>;
    deleteUserById(userId: string): Promise<{
        message: string;
    }>;
    deleteAllUsers(): Promise<{
        message: string;
    }>;
    updatePassword(userId: string, newHashedPassword: string): Promise<void>;
    trackQRCodeUsage(userId: string): Promise<User>;
    getQRCodeUsageStats(userId: string): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
    awardPoints(userId: string, points: number): Promise<User>;
    generateInvitationLink(userId: string): Promise<string>;
    trackInvitationLinkUsage(invitationLink: string): Promise<User>;
    getInvitationLinkStats(userId: string): Promise<{
        usageCount: number;
        lastUsed: Date | null;
    }>;
}
