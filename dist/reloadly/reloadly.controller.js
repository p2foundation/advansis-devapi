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
exports.ReloadlyController = void 0;
const common_1 = require("@nestjs/common");
const reloadly_service_1 = require("./reloadly.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const merchant_auth_guard_1 = require("../auth/merchant-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const country_reloadly_dto_1 = require("./dto/country-reloadly.dto");
let ReloadlyController = class ReloadlyController {
    constructor(reloadlyService) {
        this.reloadlyService = reloadlyService;
    }
    async topUp(reloadlyDto) {
        return this.reloadlyService.topUp(reloadlyDto);
    }
    async getOperatorsByCountry(countryCode) {
        return this.reloadlyService.getOperatorsByCountry(countryCode);
    }
};
exports.ReloadlyController = ReloadlyController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Top-up a phone number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top-up successful', type: Object }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, merchant_auth_guard_1.MerchantAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('topup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [country_reloadly_dto_1.CountryReloadlyDto]),
    __metadata("design:returntype", Promise)
], ReloadlyController.prototype, "topUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get operators by country code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Operators list', type: [Object] }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, merchant_auth_guard_1.MerchantAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('operators'),
    __param(0, (0, common_1.Query)('countryCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReloadlyController.prototype, "getOperatorsByCountry", null);
exports.ReloadlyController = ReloadlyController = __decorate([
    (0, swagger_1.ApiTags)('reloadly'),
    (0, common_1.Controller)('api/v1/reloadly'),
    __metadata("design:paramtypes", [reloadly_service_1.ReloadlyService])
], ReloadlyController);
//# sourceMappingURL=reloadly.controller.js.map