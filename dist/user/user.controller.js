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
const reward_service_1 = require("../reward/reward.service");
let UserController = UserController_1 = class UserController {
    constructor(userService, authService, rewardsService) {
        this.userService = userService;
        this.authService = authService;
        this.rewardsService = rewardsService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async register(createUserDto) {
        this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
        return this.userService.create(createUserDto);
    }
    async login(req) {
        this.logger.debug(`User login request ==> ${JSON.stringify(req.user)}`);
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
        this.logger.debug(`Profile request ==> ${JSON.stringify(req.user)}`);
        const user = await this.userService.findOneById(req.user.sub);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...profile } = user;
        return user;
    }
    async updateProfile(req, updateData) {
        this.logger.debug(`Profile request ===> ${req.user}`);
        return this.userService.updateProfile(req.user.sub, updateData);
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
    async changePassword(req, changePasswordDto) {
        return this.authService.changePassword(req.user.sub, changePasswordDto.currentPassword, changePasswordDto.newPassword);
    }
    async trackQRCodeUsage(req) {
        return this.userService.trackQRCodeUsage(req.user.sub);
    }
    async getQRCodeUsageStats(req) {
        return this.userService.getQRCodeUsageStats(req.user.sub);
    }
    async scanQRCode(userId) {
        await this.userService.trackQRCodeUsage(userId);
        await this.rewardsService.awardQRCodeScanPoints(userId, 'user');
        return { message: 'QR code scanned and points awarded' };
    }
    async generateInvitationLink(req) {
        this.logger.debug(`Generating invitation link for user: ${req.user.sub}`);
        const invitationLink = await this.userService.generateInvitationLink(req.user.sub);
        return { invitationLink };
    }
    async trackInvitationLinkUsage(invitationLink) {
        this.logger.debug(`Tracking invitation link usage: ${invitationLink}`);
        await this.userService.trackInvitationLinkUsage(invitationLink);
        return { message: 'Invitation link usage tracked and points awarded' };
    }
    async getInvitationLinkStats(req) {
        return this.userService.getInvitationLinkStats(req.user.sub);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created',
        type: create_user_dto_1.CreateUserDto,
        content: {
            'application/json': {
                example: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    firstName: 'Kofi',
                    lastName: 'Annan',
                    email: 'kofi.annan@example.com',
                    phoneNumber: '+1234567890',
                    roles: ['user'],
                    createdAt: '2023-04-01T12:00:00Z',
                    updatedAt: '2023-04-01T12:00:00Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                firstName: { type: 'string', example: 'Kofi' },
                lastName: { type: 'string', example: 'Annan' },
                password: { type: 'string', example: 'securePassword123' },
                roles: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['user', 'MERCHANT']
                },
                email: {
                    type: 'string',
                    example: 'kofi.annan@example.com'
                },
                phoneNumber: { type: 'string', example: '+1234567890' },
                referrerClientId: { type: 'string', description: 'Optional Merchant ClientID', example: 'MERCH123' }
            }
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
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User logged in successfully',
        content: {
            'application/json': {
                example: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        email: 'kofi.annan@example.com',
                        roles: ['user']
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            },
        },
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Generate a new refresh token' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'New refresh token generated',
        type: String,
        content: {
            'application/json': {
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
        }
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "genRefreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('points'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user points' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User points retrieved',
        type: Number,
        content: {
            'application/json': {
                example: 1000
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPoints", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved',
        type: create_user_dto_1.CreateUserDto,
        content: {
            'application/json': {
                example: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    firstName: 'Kofi',
                    lastName: 'Annan',
                    email: 'kofi.annan@example.com',
                    phoneNumber: '+1234567890',
                    roles: ['user'],
                    points: 1000,
                    createdAt: '2023-04-01T12:00:00Z',
                    updatedAt: '2023-04-01T12:00:00Z'
                }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
        type: create_user_dto_1.CreateUserDto,
        content: {
            'application/json': {
                example: {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    firstName: 'Kofi',
                    lastName: 'Annan',
                    email: 'kofi.annan@example.com',
                    phoneNumber: '+1234567890',
                    roles: ['user'],
                    points: 1000,
                    createdAt: '2023-04-01T12:00:00Z',
                    updatedAt: '2023-04-01T12:00:00Z'
                }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('profile/update'),
    (0, swagger_1.ApiBody)({
        description: 'Update user profile. Any combination of these properties can be provided.',
        schema: {
            type: 'object',
            properties: {
                firstName: { type: 'string', example: 'Kofi' },
                lastName: { type: 'string', example: 'Annan' },
                email: { type: 'string', example: 'kofi.annan@example.com' },
                phoneNumber: { type: 'string', example: '+1234567890' },
                referrerClientId: { type: 'string', description: 'Optional Merchant ClientID', example: 'MERCH123' },
                points: { type: 'number', example: 1000 },
                emailVerified: { type: 'boolean', example: false },
                phoneVerified: { type: 'boolean', example: false },
                status: { type: 'string', example: 'ACTIVE' },
                roles: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['user', 'MERCHANT']
                },
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of users',
        type: [create_user_dto_1.CreateUserDto],
        content: {
            'application/json': {
                example: [
                    {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        firstName: 'Kofi',
                        lastName: 'Annan',
                        email: 'kofi.annan@example.com',
                        phoneNumber: '+1234567890',
                        roles: ['user'],
                        points: 1000,
                        createdAt: '2023-04-01T12:00:00Z',
                        updatedAt: '2023-04-01T12:00:00Z'
                    },
                    {
                        id: '456f7890-a1b2-c3d4-e5f6-789012345678',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        phoneNumber: '+9876543210',
                        roles: ['user', 'MERCHANT'],
                        points: 2000,
                        createdAt: '2023-04-02T10:30:00Z',
                        updatedAt: '2023-04-02T10:30:00Z'
                    }
                ]
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully',
        type: String,
        content: {
            'application/json': {
                example: 'User deleted successfully'
            }
        }
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID', required: true }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All users deleted successfully',
        type: String,
        content: {
            'application/json': {
                example: 'All users deleted successfully'
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAllUsers", null);
__decorate([
    (0, common_1.Post)('merchant/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Merchant login' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Merchant logged in successfully',
        type: create_user_dto_1.CreateUserDto,
        content: {
            'application/json': {
                example: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        email: 'kofi.annan@example.com',
                        roles: ['user']
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiBody)({
        description: 'Merchant login credentials',
        required: true,
        schema: {
            type: 'object',
            properties: {
                clientId: { type: 'string', example: 'MERCH123' },
                clientSecret: { type: 'string', example: 'secureMerchantSecret123' },
            },
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "merchantLogin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('change-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user password' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password changed successfully',
        content: {
            'application/json': {
                example: 'Password changed successfully'
            }
        }
    }),
    (0, swagger_1.ApiBody)({
        description: 'Password change credentials',
        required: true,
        schema: {
            type: 'object',
            properties: {
                currentPassword: { type: 'string', description: 'Current password of the user' },
                newPassword: { type: 'string', description: 'New password to set' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('track-qr-code-usage'),
    (0, swagger_1.ApiOperation)({ summary: 'Track QR code usage' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'QR code usage tracked successfully',
        content: {
            'application/json': {
                example: 'QR code usage tracked successfully'
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "trackQRCodeUsage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('qr-code-usage-stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get QR code usage stats' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'QR code usage stats retrieved successfully',
        type: Object,
        content: {
            'application/json': {
                example: {
                    totalScans: 10,
                    lastScanDate: '2023-04-01T12:00:00Z'
                }
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQRCodeUsageStats", null);
__decorate([
    (0, common_1.Post)(':userId/scan-qr'),
    (0, swagger_1.ApiOperation)({ summary: 'Scan a user\'s QR code' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'The ID of the user whose QR code is being scanned' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'QR code scanned successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'QR code scanned and points awarded' }
            }
        }
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "scanQRCode", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('invitation-link/generate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Generate an invitation link for the user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Invitation link generated successfully',
        schema: {
            type: 'object',
            properties: {
                invitationLink: { type: 'string', example: 'https://example.com/invite/yyyymmdd/abc123' }
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "generateInvitationLink", null);
__decorate([
    (0, common_1.Post)('invitation-link/track'),
    (0, swagger_1.ApiOperation)({ summary: 'Track the usage of an invitation link' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                invitationLink: { type: 'string', example: 'https://example.com/invite/yyyymmdd/abc123' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invitation link usage tracked successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Invitation link usage tracked and points awarded' }
            }
        }
    }),
    __param(0, (0, common_1.Body)('invitationLink')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "trackInvitationLinkUsage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('invitation-link/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics for the user\'s invitation link' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invitation link statistics retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                usageCount: { type: 'number', example: 5 },
                lastUsed: { type: 'string', format: 'date-time', example: '2023-04-01T12:00:00Z' }
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getInvitationLinkStats", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/v1/users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        reward_service_1.RewardService])
], UserController);
//# sourceMappingURL=user.controller.js.map