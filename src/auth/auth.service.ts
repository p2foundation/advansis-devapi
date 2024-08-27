import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordUtil } from '../utilities/password.util';
import { TokenUtil } from '../utilities/token.util';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { JWT_EXPIRE, JWT_SECRET } from 'src/constants';
import { MerchantService } from 'src/merchant/merchant.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly merchantService: MerchantService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log(`validateUser: ${username}, ${password}`);
    const user = await this.userService.findOneByUsername(username);
    this.logger.log('ValidateUser findOneByUsername ==>', user);

    if (user && PasswordUtil.comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    // this.logger.verbose(`Login User ==> ${JSON.stringify(user)}`);
    try {
      const payload = {
        username: user._doc.username,
        sub: user._doc._id,
        roles: user._doc.roles,
      };

      this.logger.log(`Login Payload ===> ${JSON.stringify(payload)}`);

      const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET });
      const refreshToken = this.generateRefreshToken(payload);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        // user: user._doc
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to generate tokens');
    }
  }

  generateRefreshToken(payload: any) {
    this.logger.debug(`GenerateRefreshToken ==> ${JSON.stringify(payload)}`);
    return TokenUtil.generateToken(payload, '7d');
  }

  async refreshToken(refreshToken: string) {
    this.logger.log(`RefreshToken input: ${refreshToken}`);

    try {
      const payload = TokenUtil.verifyToken(refreshToken);
      if (typeof payload === 'string') {
        this.logger.error(`Invalid payload: ${payload}`);
        throw new Error('Invalid token payload');
      }

      this.logger.log('RefreshToken Payload:', payload);
      const user = await this.userService.findOneById(payload.sub);

      if (!user) {
        this.logger.error(`User not found for sub: ${payload.sub}`);
        throw new Error('User not found');
      }

      return this.login(user);
    } catch (error) {
      this.logger.error(`Error refreshing token: ${error.message}`);
      throw new Error(`Failed to refresh token: ${error.message}`);
    }
  }

  async validateMerchant(clientId: string, clientKey: string): Promise<any> {
    const merchant = await this.merchantService.findOneByClientId(clientId);
    if (merchant && merchant.clientKey === clientKey) {
      const { clientKey, password, ...result } = merchant;
      return result;
    }
    return null;
  }


  async merchantLogin(merchant: any) {
    try {
      const payload = { 
        clientId: merchant.clientId, 
        sub: merchant._id, 
        roles: ['merchant'],
        // name: merchant.name,
        // email: merchant.email
      };

      const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET });
      const refreshToken = this.generateRefreshToken(payload);

      // Update last login timestamp
      await this.merchantService.updateLastLogin(merchant._id);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        merchant: {
          id: merchant._id,
          clientId: merchant.clientId,
          // name: merchant.name,
          // email: merchant.email
        }
      };
    } catch (error) {
      this.logger.error(`Error during merchant login: ${error.message}`);
      throw new Error('Failed to generate merchant tokens');
    }
  }

}

