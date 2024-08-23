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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let UserController = UserController_1 = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async register(createUserDto) {
        this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
        return this.userService.create(createUserDto);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async genRefreshToken(authHeader) {
        if (!authHeader) {
            throw new Error('No authorization header provided');
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new Error('Invalid authorization header format');
        }
        return this.authService.refreshToken(token);
    }
    async getPoints(req) {
        const user = await this.userService.findOneById(req.user.sub);
        return { points: user.points };
    }
    async getProfile(req) {
        this.logger.debug(`User Profile request ==> ${JSON.stringify(req.user)}`);
        const user = await this.userService.findOneById(req.user.sub);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...profile } = user;
        return profile;
    }
    async getAllUsers() {
        return this.userService.findAll();
    }
    async deleteUserById(userId) {
        this.logger.debug(`Deleting user with ID: ${userId}`);
        return this.userService.deleteUserById(userId);
    }
    async deleteAllUsers() {
        this.logger.debug('Deleting all users');
        return this.userService.deleteAllUsers();
    }
    async merchantLogin(loginDto) {
        const merchant = await this.authService.validateMerchant(loginDto.clientId, loginDto.clientKey);
        if (!merchant) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.authService.merchantLogin(merchant);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The record has been successfully created', type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request', type: String }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                role: {
                    type: 'string',
                    enum: ['USER', 'AGENT', 'ADMIN', 'DEVELOPER', 'MERCHANT', 'GUEST']
                }
            },
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged in successfully', type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'Peprah' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['email', 'password'],
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a new refresh token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'New refresh token generated', type: String }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "genRefreshToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user points' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User points retrieved', type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('points'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPoints", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved', type: create_user_dto_1.CreateUserDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of users', type: [create_user_dto_1.CreateUserDto] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', required: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All users deleted successfully', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Merchant login', description: 'Logs in a merchant using their client ID and client key.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Merchant logged in successfully', type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access', type: String }),
    (0, common_1.Post)('merchant/login'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                clientId: { type: 'string', description: 'Unique identifier for the merchant', example: 'merchant123' },
                clientKey: { type: 'string', description: 'Secret key for the merchant', example: 'secretKey123' },
            },
            required: ['clientId', 'clientKey'],
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "merchantLogin", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('api/v1/users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map