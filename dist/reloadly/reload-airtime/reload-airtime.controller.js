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
var ReloadAirtimeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadAirtimeController = void 0;
const common_1 = require("@nestjs/common");
const reload_airtime_service_1 = require("./reload-airtime.service");
const reload_airtime_dto_1 = require("./dto/reload.airtime.dto");
const swagger_1 = require("@nestjs/swagger");
let ReloadAirtimeController = ReloadAirtimeController_1 = class ReloadAirtimeController {
    constructor(reloadAirtimeService) {
        this.reloadAirtimeService = reloadAirtimeService;
        this.logger = new common_1.Logger(ReloadAirtimeController_1.name);
    }
    async getAccessToken() {
        const gatRes = this.reloadAirtimeService.generateAccessToken();
        console.log(`access token response:::  ${gatRes}`);
        return gatRes;
    }
    testReloadLyAirtime() {
        return `we made it ...`;
    }
    async airtimeRecharge(airDto) {
        console.debug(`airtime dto ==> ${airDto}`);
        const ar = this.reloadAirtimeService.makeTopUp(airDto);
        return ar;
    }
    async asyncAirtimeRecharge(aarDto) {
        this.logger.debug(`async airtime recharge Dto ==> ${aarDto}`);
        const aar = this.reloadAirtimeService.makeAsynchronousTopUp(aarDto);
        return aar;
    }
};
exports.ReloadAirtimeController = ReloadAirtimeController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Generate access token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Access token generated successfully' }),
    (0, common_1.Get)('/token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReloadAirtimeController.prototype, "getAccessToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Test successful' }),
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ReloadAirtimeController.prototype, "testReloadLyAirtime", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Recharge airtime' }),
    (0, swagger_1.ApiBody)({ type: reload_airtime_dto_1.ReloadAirtimeDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Airtime recharged successfully' }),
    (0, common_1.Post)('recharge'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reload_airtime_dto_1.ReloadAirtimeDto]),
    __metadata("design:returntype", Promise)
], ReloadAirtimeController.prototype, "airtimeRecharge", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Recharge airtime asynchronously' }),
    (0, swagger_1.ApiBody)({ type: reload_airtime_dto_1.ReloadAirtimeDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asynchronous airtime recharge initiated' }),
    (0, common_1.Post)('/recharge-async'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reload_airtime_dto_1.ReloadAirtimeDto]),
    __metadata("design:returntype", Promise)
], ReloadAirtimeController.prototype, "asyncAirtimeRecharge", null);
exports.ReloadAirtimeController = ReloadAirtimeController = ReloadAirtimeController_1 = __decorate([
    (0, swagger_1.ApiTags)('Reload Airtime'),
    (0, common_1.Controller)('api/v1/reload-airtime'),
    __metadata("design:paramtypes", [reload_airtime_service_1.ReloadAirtimeService])
], ReloadAirtimeController);
//# sourceMappingURL=reload-airtime.controller.js.map