"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtimeModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const airtime_controller_1 = require("./airtime.controller");
const airtime_service_1 = require("./airtime.service");
const transaction_service_1 = require("../../transaction/transaction.service");
const transaction_module_1 = require("../../transaction/transaction.module");
const merchant_service_1 = require("../../merchant/merchant.service");
const merchant_module_1 = require("../../merchant/merchant.module");
let AirtimeModule = class AirtimeModule {
};
exports.AirtimeModule = AirtimeModule;
exports.AirtimeModule = AirtimeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            transaction_module_1.TransactionModule,
            merchant_module_1.MerchantModule
        ],
        controllers: [airtime_controller_1.AirtimeController],
        providers: [
            airtime_service_1.AirtimeService,
            transaction_service_1.TransactionService,
            merchant_service_1.MerchantService
        ]
    })
], AirtimeModule);
//# sourceMappingURL=airtime.module.js.map