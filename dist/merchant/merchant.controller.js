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
var MerchantController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const merchant_service_1 = require("./merchant.service");
const create_merchant_dto_1 = require("./dto/create-merchant.dto");
const update_merchant_dto_1 = require("./dto/update-merchant.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const merchant_schema_1 = require("./schemas/merchant.schema");
let MerchantController = MerchantController_1 = class MerchantController {
    constructor(merchantService) {
        this.merchantService = merchantService;
        this.logger = new common_1.Logger(MerchantController_1.name);
    }
    async register(createMerchantDto) {
        return this.merchantService.create(createMerchantDto);
    }
    async findMerchant(merchantId) {
        return this.merchantService.findOneByClientId(merchantId);
    }
    async findAllMerchants() {
        return this.merchantService.findAllRegisteredMerchants();
    }
    async update(merchantId, updateMerchantDto) {
        return this.merchantService.update(merchantId, updateMerchantDto);
    }
    async delete(merchantId) {
        return this.merchantService.delete(merchantId);
    }
    async getQRCode(clientId) {
        const merchant = await this.merchantService.findOneByClientId(clientId);
        return { qrCode: merchant.qrCode };
    }
};
exports.MerchantController = MerchantController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new merchant' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The record has been successfully created', type: merchant_schema_1.Merchant }),
    (0, swagger_1.ApiBody)({
        description: 'Merchant registration details',
        schema: {
            type: 'object',
            required: ['name', 'email', 'phoneNumber', 'password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'The name of the merchant',
                },
                email: {
                    type: 'string',
                    description: 'Email address of the merchant',
                },
                phoneNumber: {
                    type: 'string',
                    description: 'Phone number of the merchant',
                },
                password: {
                    type: 'string',
                    description: 'Password for the merchant account',
                },
                street: {
                    type: 'string',
                    description: 'Street address of the merchant',
                },
                city: {
                    type: 'string',
                    description: 'City of the merchant',
                },
                ghanaPostGPS: {
                    type: 'string',
                    description: 'Ghana Post GPS location of the merchant',
                },
                state: {
                    type: 'string',
                    description: 'State of the merchant',
                },
                zip: {
                    type: 'string',
                    description: 'Zip code of the merchant',
                },
                country: {
                    type: 'string',
                    description: 'Country of the merchant',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchant_dto_1.CreateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find a merchant by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The found merchant', type: merchant_schema_1.Merchant }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findMerchant", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all registered merchants' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of merchants', type: [merchant_schema_1.Merchant] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findAllMerchants", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a merchant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The updated merchant', type: merchant_schema_1.Merchant }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merchant_dto_1.UpdateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a merchant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Merchant has been successfully removed' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a merchant QR code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'QR code of the merchant', type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':clientId/qrcode'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "getQRCode", null);
exports.MerchantController = MerchantController = MerchantController_1 = __decorate([
    (0, swagger_1.ApiTags)('merchants'),
    (0, common_1.Controller)('api/v1/merchants'),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService])
], MerchantController);
//# sourceMappingURL=merchant.controller.js.map