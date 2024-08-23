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
var AirtimeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtimeController = void 0;
const common_1 = require("@nestjs/common");
const airtime_service_1 = require("./airtime.service");
const topup_dto_1 = require("./dto/topup.dto");
const transtatus_dto_1 = require("./dto/transtatus.dto");
let AirtimeController = AirtimeController_1 = class AirtimeController {
    constructor(airtimeService) {
        this.airtimeService = airtimeService;
        this.logger = new common_1.Logger(AirtimeController_1.name);
    }
    testAirtime() {
        return `Airtime top-up processing ...`;
    }
    async queryTransactionstatus(qtsDto) {
        this.logger.log(`transtatus dto => ${JSON.stringify(qtsDto)}`);
        const ts = await this.airtimeService.transactionStatus(qtsDto);
        return ts;
    }
    async processTopup(ptDto) {
        this.logger.log(`topup airtime dto => ${JSON.stringify(ptDto)}`);
        if (!ptDto.userId || typeof ptDto.userId !== 'string') {
            throw new common_1.BadRequestException('Invalid userId');
        }
        const ta = await this.airtimeService.topupAirtimeService(ptDto);
        return ta;
    }
};
exports.AirtimeController = AirtimeController;
__decorate([
    (0, common_1.Get)('testopup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AirtimeController.prototype, "testAirtime", null);
__decorate([
    (0, common_1.Post)('/transtatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transtatus_dto_1.TransStatusDto]),
    __metadata("design:returntype", Promise)
], AirtimeController.prototype, "queryTransactionstatus", null);
__decorate([
    (0, common_1.Post)('/topup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [topup_dto_1.TopupDto]),
    __metadata("design:returntype", Promise)
], AirtimeController.prototype, "processTopup", null);
exports.AirtimeController = AirtimeController = AirtimeController_1 = __decorate([
    (0, common_1.Controller)('api/airtime'),
    __metadata("design:paramtypes", [airtime_service_1.AirtimeService])
], AirtimeController);
//# sourceMappingURL=airtime.controller.js.map