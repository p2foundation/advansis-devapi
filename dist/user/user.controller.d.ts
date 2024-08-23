import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private logger;
    constructor(userService: UserService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    login(req: any): Promise<any>;
    genRefreshToken(authHeader: string): Promise<any>;
    getPoints(req: any): Promise<{
        points: number;
    }>;
    getProfile(req: any): Promise<{
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        gravatar: string;
        roles: string[];
        qrCode: string;
        points: number;
        status: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
}
