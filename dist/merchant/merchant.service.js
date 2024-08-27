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
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const password_util_1 = require("../utilities/password.util");
const token_util_1 = require("../utilities/token.util");
const qr_code_util_1 = require("../utilities/qr-code.util");
let MerchantService = class MerchantService {
    constructor(merchantModel) {
        this.merchantModel = merchantModel;
    }
    async create(createMerchantDto) {
        const hashedPassword = await password_util_1.PasswordUtil.hashPassword(createMerchantDto.password);
        const clientId = (0, uuid_1.v4)();
        const clientKey = token_util_1.TokenUtil.generateToken({ clientId }, '365d');
        const existingMerchant = await this.merchantModel.findOne({ clientId }).exec();
        if (existingMerchant) {
            throw new Error('Client ID already exists');
        }
        const qrCode = await (0, qr_code_util_1.generateQrCode)(clientId);
        const merchantData = {
            ...createMerchantDto,
            password: hashedPassword,
            clientId,
            clientKey,
            qrCode,
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
        const updateData = { ...updateMerchantDto };
        if (updateData.password) {
            updateData.password = await password_util_1.PasswordUtil.hashPassword(updateData.password);
        }
        return this.merchantModel.findByIdAndUpdate(merchantId, updateData, { new: true }).exec();
    }
    async delete(merchantId) {
        await this.merchantModel.findByIdAndDelete(merchantId).exec();
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
        await this.merchantModel.updateOne({ clientId }, { $inc: { rewardPoints: points } }).exec();
    }
};
exports.MerchantService = MerchantService;
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MerchantModel')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MerchantService);
//# sourceMappingURL=merchant.service.js.map