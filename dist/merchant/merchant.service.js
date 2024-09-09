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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const merchant_schema_1 = require("./schemas/merchant.schema");
const uuid_1 = require("uuid");
const password_util_1 = require("../utilities/password.util");
const token_util_1 = require("../utilities/token.util");
const qr_code_util_1 = require("../utilities/qr-code.util");
const constants_1 = require("../constants");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
let MerchantService = class MerchantService {
    constructor(merchantModel, userService, authService) {
        this.merchantModel = merchantModel;
        this.userService = userService;
        this.authService = authService;
    }
    async create(createMerchantDto) {
        const existingMerchant = await this.merchantModel.findOne({
            $or: [
                { email: createMerchantDto.email },
                { phoneNumber: createMerchantDto.phoneNumber }
            ]
        }).exec();
        if (existingMerchant) {
            throw new common_1.ConflictException('A merchant with this email or phone number already exists');
        }
        const hashedPassword = await password_util_1.PasswordUtil.hashPassword(createMerchantDto.password);
        const clientId = (0, uuid_1.v4)();
        const clientKey = token_util_1.TokenUtil.generateToken({ clientId }, '365d');
        const qrCode = await (0, qr_code_util_1.generateQrCode)(clientId);
        const merchantData = {
            ...createMerchantDto,
            password: hashedPassword,
            clientId,
            clientKey,
            qrCode,
            roles: ['merchant'] || createMerchantDto.roles,
            address: [
                {
                    ghanaPostGPS: createMerchantDto.ghanaPostGPS,
                    street: createMerchantDto.street,
                    city: createMerchantDto.city,
                    state: createMerchantDto.state,
                    zip: createMerchantDto.zip,
                    country: createMerchantDto.country,
                }
            ]
        };
        const createdMerchant = new this.merchantModel(merchantData);
        return createdMerchant.save();
    }
    async findOneByClientId(clientId) {
        return this.merchantModel.findOne({ clientId }).exec();
    }
    async update(merchantId, updateMerchantDto) {
        const updateData = {
            ...updateMerchantDto,
            address: [
                {
                    ghanaPostGPS: updateMerchantDto.ghanaPostGPS,
                    street: updateMerchantDto.street,
                    city: updateMerchantDto.city,
                    state: updateMerchantDto.state,
                    zip: updateMerchantDto.zip,
                    country: updateMerchantDto.country
                }
            ]
        };
        if (updateData.password) {
            updateData.password = await password_util_1.PasswordUtil.hashPassword(updateData.password);
        }
        const updatedMerchant = await this.merchantModel.findByIdAndUpdate(merchantId, updateData, { new: true, runValidators: true }).exec();
        if (!updatedMerchant) {
            throw new common_1.NotFoundException(`Merchant with ID "${merchantId}" not found`);
        }
        return updatedMerchant;
    }
    async delete(merchantId) {
        const result = await this.merchantModel.findByIdAndDelete(merchantId).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Merchant with ID "${merchantId}" not found`);
        }
    }
    async updateLastLogin(merchantId) {
        await this.merchantModel.findByIdAndUpdate(merchantId, { lastLogin: new Date() });
    }
    async findAllRegisteredMerchants() {
        const merchants = await this.merchantModel.find().exec();
        const total = merchants.length;
        return { merchants, total };
    }
    async updateRewardPoints(clientId, points) {
        const result = await this.merchantModel.updateOne({ clientId }, { $inc: { rewardPoints: points } });
        if (result.matchedCount === 0) {
            throw new common_1.NotFoundException('Merchant not found');
        }
    }
    async changePassword(clientId, currentPassword, newPassword) {
        const merchant = await this.merchantModel.findOne({ clientId }).select('+password');
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const isPasswordValid = await password_util_1.PasswordUtil.comparePassword(currentPassword, merchant.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        if (currentPassword === newPassword) {
            throw new common_1.BadRequestException('New password must be different from the current password');
        }
        const hashedPassword = await password_util_1.PasswordUtil.hashPassword(newPassword);
        await this.merchantModel.updateOne({ clientId }, { $set: { password: hashedPassword } });
    }
    async trackQRCodeUsage(clientId) {
        const updatedMerchant = await this.merchantModel.findOneAndUpdate({ clientId }, {
            $inc: { qrCodeUsageCount: 1 },
            $set: { lastQRCodeUsage: new Date() }
        }, { new: true, runValidators: true });
        if (!updatedMerchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        await this.updateRewardPoints(clientId, constants_1.QR_CODE_SCAN_REWARD_POINTS);
        return updatedMerchant;
    }
    async getQRCodeUsageStats(clientId) {
        const merchant = await this.merchantModel.findOne({ clientId }, 'qrCodeUsageCount lastQRCodeUsage');
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        return {
            usageCount: merchant.qrCodeUsageCount || 0,
            lastUsed: merchant.lastQRCodeUsage || null,
        };
    }
    async generateInvitationLink(merchantId) {
        const merchant = await this.merchantModel.findById(merchantId);
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const invitationLink = `${process.env.APP_URL}/merchant-invite/${(0, uuid_1.v4)()}`;
        merchant.invitationLink = invitationLink;
        await merchant.save();
        return invitationLink;
    }
    async trackInvitationLinkUsage(invitationLink) {
        const merchant = await this.merchantModel.findOne({ invitationLink });
        if (!merchant) {
            throw new common_1.NotFoundException('Invalid invitation link');
        }
        const updatedMerchant = await this.merchantModel.findByIdAndUpdate(merchant._id, {
            $inc: { invitationLinkUsageCount: 1 },
            $set: { lastInvitationLinkUsage: new Date() }
        }, { new: true, runValidators: true });
        await this.updateRewardPoints(merchant.clientId, constants_1.MERCHANT_INVITATION_LINK_REWARD_POINTS);
        return updatedMerchant;
    }
    async getInvitationLinkStats(clientId) {
        const merchant = await this.merchantModel.findOne({ clientId }, 'invitationLinkUsageCount lastInvitationLinkUsage');
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        return {
            usageCount: merchant.invitationLinkUsageCount || 0,
            lastUsed: merchant.lastInvitationLinkUsage || null,
        };
    }
};
exports.MerchantService = MerchantService;
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(merchant_schema_1.Merchant.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        auth_service_1.AuthService])
], MerchantService);
//# sourceMappingURL=merchant.service.js.map