import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MerchantService } from 'src/merchant/merchant.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly merchantService;
    private logger;
    constructor(userService: UserService, jwtService: JwtService, merchantService: MerchantService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<any>;
    generateRefreshToken(payload: any): string;
    refreshToken(refreshToken: string): Promise<any>;
    validateMerchant(clientId: string, clientKey: string): Promise<any>;
    merchantLogin(merchant: any): Promise<{
        access_token: string;
        refresh_token: string;
        merchant: {
            id: any;
            clientId: any;
        };
    }>;
}
