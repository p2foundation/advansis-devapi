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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./schemas/transaction.schema");
const merchant_service_1 = require("../merchant/merchant.service");
const crypto = require("crypto");
let TransactionService = class TransactionService {
    constructor(transactionModel, merchantService) {
        this.transactionModel = transactionModel;
        this.merchantService = merchantService;
    }
    async create(transDto) {
        const createdTransaction = new this.transactionModel({
            ...transDto,
            status: 'pending',
            transactionId: this.generateTransactionId(),
        });
        const savedTransaction = await createdTransaction.save();
        if (transDto.referrerClientId) {
            await this.merchantService.updateRewardPoints(transDto.referrerClientId, 5);
        }
        return savedTransaction;
    }
    async findAll() {
        return this.transactionModel.find().exec();
    }
    async findOne(transactionId) {
        return this.transactionModel.findOne({ transactionId }).exec();
    }
    async update(transactionId, updateTransactionDto) {
        return this.transactionModel.findOneAndUpdate({ transactionId }, updateTransactionDto, { new: true }).exec();
    }
    async delete(transactionId) {
        await this.transactionModel.findOneAndDelete({ transactionId }).exec();
    }
    async getTransactionHistory(userId, filter) {
        const query = { userId };
        if (filter) {
            query['status'] = filter;
        }
        return this.transactionModel.find(query).exec();
    }
    generateTransactionId() {
        return 'txn_' + crypto.randomBytes(4).toString('hex');
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        merchant_service_1.MerchantService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map