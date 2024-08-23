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
var SmsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const sms_dto_1 = require("./dto/sms.dto");
const sms_service_1 = require("./sms.service");
let SmsController = SmsController_1 = class SmsController {
    constructor(smsService) {
        this.smsService = smsService;
        this.logger = new common_1.Logger(SmsController_1.name);
    }
    async sendSms(transDto) {
        const s2 = await this.smsService.SendSMS(transDto);
        return s2;
    }
    async sendBulkSms(transDto) {
        const sbs = await this.smsService.postBulkSMS(transDto);
        return sbs;
    }
};
exports.SmsController = SmsController;
__decorate([
    (0, common_1.Post)('sendsms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sms_dto_1.SmsDto]),
    __metadata("design:returntype", Promise)
], SmsController.prototype, "sendSms", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sms_dto_1.SmsDto]),
    __metadata("design:returntype", Promise)
], SmsController.prototype, "sendBulkSms", null);
exports.SmsController = SmsController = SmsController_1 = __decorate([
    (0, common_1.Controller)('api/sms'),
    __metadata("design:paramtypes", [sms_service_1.SmsService])
], SmsController);
//# sourceMappingURL=sms.controller.js.map