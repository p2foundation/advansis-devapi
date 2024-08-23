import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../utilities/email.service';
import { SmsService } from 'src/utilities/sms.util';
import { GravatarService } from 'src/utilities/gravatar.util';
import { MerchantService } from 'src/merchant/merchant.service';
export declare class UserService {
    private userModel;
    private emailService;
    private smsService;
    private gravatarService;
    private readonly merchantService;
    private logger;
    constructor(userModel: Model<UserDocument>, emailService: EmailService, smsService: SmsService, gravatarService: GravatarService, merchantService: MerchantService);
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
}
