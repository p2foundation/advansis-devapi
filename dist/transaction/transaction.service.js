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
let TransactionService = class TransactionService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async create(createTransactionDto) {
        const createdTransaction = new this.transactionModel(createTransactionDto);
        return createdTransaction.save();
    }
    async findAll() {
        return this.transactionModel.find().exec();
    }
    async findOne(id) {
        const transaction = await this.transactionModel.findById(id).exec();
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction #${id} not found`);
        }
        return transaction;
    }
    async update(id, updateTransactionDto) {
        const updatedTransaction = await this.transactionModel
            .findByIdAndUpdate(id, updateTransactionDto, { new: true })
            .exec();
        if (!updatedTransaction) {
            throw new common_1.NotFoundException(`Transaction #${id} not found`);
        }
        return updatedTransaction;
    }
    async remove(id) {
        const deletedTransaction = await this.transactionModel.findByIdAndDelete(id).exec();
        if (!deletedTransaction) {
            throw new common_1.NotFoundException(`Transaction #${id} not found`);
        }
        return deletedTransaction;
    }
    async findByUserId(userId) {
        return this.transactionModel.find({ userId }).exec();
    }
    async findByType(type) {
        return this.transactionModel.find({ transactionType: type }).exec();
    }
    async findByStatus(status) {
        return this.transactionModel.find({ status }).exec();
    }
    async getTransactionStats(userId) {
        const stats = await this.transactionModel.aggregate([
            { $match: { userId } },
            { $group: {
                    _id: '$transactionType',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' },
                    avgAmount: { $avg: '$amount' }
                } }
        ]).exec();
        return stats;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map