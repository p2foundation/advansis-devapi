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
exports.BillpaymentsController = void 0;
const common_1 = require("@nestjs/common");
const billpayments_service_1 = require("./billpayments.service");
const billpayments_dto_1 = require("./dto/billpayments.dto");
let BillpaymentsController = class BillpaymentsController {
    constructor(billpaymentService) {
        this.billpaymentService = billpaymentService;
        this.logger = new common_1.Logger('BillpaymentsController');
    }
    async buyInternetData(bidDto) {
        this.logger.log(`INTERNET DATA dto => ${JSON.stringify(bidDto)}`);
        const ts = await this.billpaymentService.topupInternetBundle(bidDto);
        return ts;
    }
    async listDataBundle(ldbDto) {
        this.logger.log(`BUNDLE LIST dto => ${JSON.stringify(ldbDto)}`);
        const ta = await this.billpaymentService.dataBundleList(ldbDto);
        return ta;
    }
};
exports.BillpaymentsController = BillpaymentsController;
__decorate([
    (0, common_1.Post)('/internetdata'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billpayments_dto_1.BillpaymentDto]),
    __metadata("design:returntype", Promise)
], BillpaymentsController.prototype, "buyInternetData", null);
__decorate([
    (0, common_1.Post)('/bundlelist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billpayments_dto_1.BillpaymentDto]),
    __metadata("design:returntype", Promise)
], BillpaymentsController.prototype, "listDataBundle", null);
exports.BillpaymentsController = BillpaymentsController = __decorate([
    (0, common_1.Controller)('billpayments'),
    __metadata("design:paramtypes", [billpayments_service_1.BillpaymentsService])
], BillpaymentsController);
//# sourceMappingURL=billpayments.controller.js.map