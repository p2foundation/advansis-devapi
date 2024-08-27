"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const password_util_1 = require("../utilities/password.util");
const token_util_1 = require("../utilities/token.util");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const merchant_service_1 = require("../merchant/merchant.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, merchantService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.merchantService = merchantService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(username, password) {
        this.logger.log(`validateUser: ${username}, ${password}`);
        const user = await this.userService.findOneByUsername(username);
        this.logger.log('ValidateUser findOneByUsername ==>', user);
        if (user && password_util_1.PasswordUtil.comparePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        try {
            const payload = {
                username: user._doc.username,
                sub: user._doc._id,
                roles: user._doc.roles,
            };
            this.logger.log(`Login Payload ===> ${JSON.stringify(payload)}`);
            const accessToken = this.jwtService.sign(payload, { secret: constants_1.JWT_SECRET });
            const refreshToken = this.generateRefreshToken(payload);
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        }
        catch (error) {
            console.error('Error during login:', error);
            throw new Error('Failed to generate tokens');
        }
    }
    generateRefreshToken(payload) {
        this.logger.debug(`GenerateRefreshToken ==> ${JSON.stringify(payload)}`);
        return token_util_1.TokenUtil.generateToken(payload, '7d');
    }
    async refreshToken(refreshToken) {
        this.logger.log(`RefreshToken input: ${refreshToken}`);
        try {
            const payload = token_util_1.TokenUtil.verifyToken(refreshToken);
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
        }
        catch (error) {
            this.logger.error(`Error refreshing token: ${error.message}`);
            throw new Error(`Failed to refresh token: ${error.message}`);
        }
    }
    async validateMerchant(clientId, clientKey) {
        const merchant = await this.merchantService.findOneByClientId(clientId);
        if (merchant && merchant.clientKey === clientKey) {
            const { clientKey, password, ...result } = merchant;
            return result;
        }
        return null;
    }
    async merchantLogin(merchant) {
        try {
            const payload = {
                clientId: merchant.clientId,
                sub: merchant._id,
                roles: ['merchant'],
            };
            const accessToken = this.jwtService.sign(payload, { secret: constants_1.JWT_SECRET });
            const refreshToken = this.generateRefreshToken(payload);
            await this.merchantService.updateLastLogin(merchant._id);
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                merchant: {
                    id: merchant._id,
                    clientId: merchant.clientId,
                }
            };
        }
        catch (error) {
            this.logger.error(`Error during merchant login: ${error.message}`);
            throw new Error('Failed to generate merchant tokens');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        merchant_service_1.MerchantService])
], AuthService);
//# sourceMappingURL=auth.service.js.map