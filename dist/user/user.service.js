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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const password_util_1 = require("../utilities/password.util");
const validation_util_1 = require("../utilities/validation.util");
const email_service_1 = require("../utilities/email.service");
const qr_code_util_1 = require("../utilities/qr-code.util");
const sms_util_1 = require("../utilities/sms.util");
const gravatar_util_1 = require("../utilities/gravatar.util");
const merchant_service_1 = require("../merchant/merchant.service");
let UserService = UserService_1 = class UserService {
    constructor(userModel, emailService, smsService, gravatarService, merchantService) {
        this.userModel = userModel;
        this.emailService = emailService;
        this.smsService = smsService;
        this.gravatarService = gravatarService;
        this.merchantService = merchantService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async create(userDto) {
        try {
            if (!validation_util_1.ValidationUtil.isValidEmail(userDto.email)) {
                throw new Error('Invalid email address');
            }
            const existingUser = await this.userModel.findOne({ email: userDto.email }).exec();
            if (existingUser) {
                throw new common_1.BadRequestException('User already registered');
            }
            const hashedPassword = await password_util_1.PasswordUtil.hashPassword(userDto.password);
            const gravatarUrl = await this.gravatarService.fetchAvatar(userDto.email);
            const createdUser = new this.userModel({ ...userDto, password: hashedPassword });
            if (createdUser.roles && createdUser.roles.some(role => role.toLowerCase() === 'agent')) {
                this.logger.debug(`User QrCode Generating ==>`);
                createdUser.qrCode = await (0, qr_code_util_1.generateQrCode)(createdUser._id.toString());
            }
            createdUser.points = 0;
            createdUser.gravatar = gravatarUrl;
            await createdUser.save();
            if (userDto.referrerClientId) {
                await this.merchantService.updateRewardPoints(userDto.referrerClientId, 10);
            }
            return createdUser;
        }
        catch (error) {
            throw error;
        }
    }
    async findOneByUsername(username) {
        if (!username) {
            throw new Error('Username is required');
        }
        return this.userModel.findOne({ username }).exec();
    }
    async findOneById(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.userModel.findById(userId).exec();
    }
    async updateProfile(userId, updateData) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        if (!updateData || typeof updateData !== 'object') {
            throw new Error('Invalid update data');
        }
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async addPoints(userId, points) {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (!user) {
                throw new Error('User not found');
            }
            user.points += points;
            return user.save();
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const users = await this.userModel.find().exec();
            const totalCount = await this.userModel.countDocuments().exec();
            return { users, totalCount };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUserById(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        try {
            const result = await this.userModel.findByIdAndDelete(userId).exec();
            if (!result) {
                throw new Error('User not found');
            }
            return { message: 'User successfully deleted' };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAllUsers() {
        try {
            await this.userModel.deleteMany({}).exec();
            return { message: 'All users successfully deleted' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService,
        sms_util_1.SmsService,
        gravatar_util_1.GravatarService,
        merchant_service_1.MerchantService])
], UserService);
//# sourceMappingURL=user.service.js.map