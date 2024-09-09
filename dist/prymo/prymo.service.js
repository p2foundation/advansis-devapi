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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrymoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const transaction_service_1 = require("../transaction/transaction.service");
let PrymoService = class PrymoService {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.axiosInstance = axios_1.default.create({
            baseURL: process.env.PRYMO_API_BASE_URL,
            headers: {
                'Authorization': `Bearer ${process.env.PRYMO_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
    }
    async topUp(phoneNumber, operatorId, amount, userId) {
        const transactionId = `prymo_${Date.now()}`;
        const transactionDto = {
            userId,
            phoneNumber,
            operatorId,
            amount,
            currency: 'GHS',
            transactionId,
            status: 'pending',
            type: 'topup',
            operator: operatorId,
            serviceCode: 'N/A',
            transMessage: 'N/A',
            serviceTransId: 'N/A',
            transStatus: 'N/A',
            balance_before: '0',
            balance_after: '0',
        };
        await this.transactionService.create(transactionDto);
        try {
            const response = await this.axiosInstance.post('/topup', {
                phoneNumber,
                operatorId,
                amount,
            });
            const updateTransactionDto = {
                status: 'success',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            return response.data;
        }
        catch (error) {
            const updateTransactionDto = {
                status: 'failed',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            throw new common_1.HttpException('Prymo Top-up Failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOperators(userId) {
        const transactionId = `prymo_op_${Date.now()}`;
        const transactionDto = {
            userId,
            phoneNumber: 'N/A',
            operatorId: 'N/A',
            amount: 0,
            currency: 'GHS',
            transactionId: transactionId,
            status: 'pending',
            type: 'topup',
            operator: 'N/A',
            serviceCode: 'N/A',
            transMessage: 'N/A',
            serviceTransId: 'N/A',
            transStatus: 'N/A',
            balance_before: '0',
            balance_after: '0',
        };
        await this.transactionService.create(transactionDto);
        try {
            const response = await this.axiosInstance.get('/operators');
            const updateTransactionDto = {
                status: 'success',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            return response.data;
        }
        catch (error) {
            const updateTransactionDto = {
                status: 'failed',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            throw new common_1.HttpException('Failed to Retrieve Prymo Operators', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sendSMS(phoneNumber, message, userId) {
        const transactionId = `prymo_sms_${Date.now()}`;
        const transactionDto = {
            userId,
            phoneNumber,
            operatorId: 'N/A',
            amount: 0,
            currency: 'N/A',
            transactionId,
            status: 'pending',
            type: 'sms',
            operator: 'N/A',
            serviceCode: '',
            transMessage: '',
            serviceTransId: '',
            transStatus: '',
            balance_before: '',
            balance_after: ''
        };
        await this.transactionService.create(transactionDto);
        try {
            const response = await this.axiosInstance.post('/sms', {
                phoneNumber,
                message,
            });
            const updateTransactionDto = {
                status: 'success',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            return response.data;
        }
        catch (error) {
            const updateTransactionDto = {
                status: 'failed',
                ...transactionDto,
            };
            await this.transactionService.update(transactionId, updateTransactionDto);
            throw new common_1.HttpException('Prymo SMS Failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PrymoService = PrymoService;
exports.PrymoService = PrymoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], PrymoService);
//# sourceMappingURL=prymo.service.js.map