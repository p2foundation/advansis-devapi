"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrymoModule = void 0;
const common_1 = require("@nestjs/common");
const prymo_service_1 = require("./prymo.service");
const prymo_controller_1 = require("./prymo.controller");
const transaction_service_1 = require("../transaction/transaction.service");
const transaction_module_1 = require("../transaction/transaction.module");
const axios_1 = require("@nestjs/axios");
const merchant_module_1 = require("../merchant/merchant.module");
const merchant_service_1 = require("../merchant/merchant.service");
let PrymoModule = class PrymoModule {
};
exports.PrymoModule = PrymoModule;
exports.PrymoModule = PrymoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            transaction_module_1.TransactionModule,
            merchant_module_1.MerchantModule
        ],
        providers: [
            prymo_service_1.PrymoService,
            transaction_service_1.TransactionService,
            merchant_service_1.MerchantService
        ],
        controllers: [prymo_controller_1.PrymoController],
        exports: [prymo_service_1.PrymoService]
    })
], PrymoModule);
//# sourceMappingURL=prymo.module.js.map