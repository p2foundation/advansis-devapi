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
exports.PrymoController = void 0;
const common_1 = require("@nestjs/common");
const prymo_service_1 = require("./prymo.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const merchant_auth_guard_1 = require("../auth/merchant-auth.guard");
let PrymoController = class PrymoController {
    constructor(prymoService) {
        this.prymoService = prymoService;
    }
    async topUp(phoneNumber, operatorId, amount, userId) {
        return this.prymoService.topUp(phoneNumber, operatorId, amount, userId);
    }
    async getOperators(userId) {
        return this.prymoService.getOperators(userId);
    }
    async sendSMS(phoneNumber, message, userId) {
        return this.prymoService.sendSMS(phoneNumber, message, userId);
    }
};
exports.PrymoController = PrymoController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, merchant_auth_guard_1.MerchantAuthGuard),
    (0, common_1.Post)('topup'),
    (0, swagger_1.ApiOperation)({ summary: 'Perform a top-up with Prymo' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phoneNumber: { type: 'string', example: '233XXXXXXXXX' },
                operatorId: { type: 'string', example: '1234' },
                amount: { type: 'number', example: 10 },
                userId: { type: 'string', example: 'userId123' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Top-up successful' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('operatorId')),
    __param(2, (0, common_1.Body)('amount')),
    __param(3, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], PrymoController.prototype, "topUp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, merchant_auth_guard_1.MerchantAuthGuard),
    (0, common_1.Get)('operators'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available operators from Prymo' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', example: 'userId123' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Operators retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrymoController.prototype, "getOperators", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, merchant_auth_guard_1.MerchantAuthGuard),
    (0, common_1.Post)('sms'),
    (0, swagger_1.ApiOperation)({ summary: 'Send SMS using Prymo' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                phoneNumber: { type: 'string', example: '233XXXXXXXXX' },
                message: { type: 'string', example: 'Your airtime top-up was successful.' },
                userId: { type: 'string', example: 'userId123' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'SMS sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('message')),
    __param(2, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PrymoController.prototype, "sendSMS", null);
exports.PrymoController = PrymoController = __decorate([
    (0, swagger_1.ApiTags)('Prymo'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/prymo'),
    __metadata("design:paramtypes", [prymo_service_1.PrymoService])
], PrymoController);
//# sourceMappingURL=prymo.controller.js.map