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
exports.ReloadlyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const transaction_service_1 = require("../transaction/transaction.service");
let ReloadlyService = class ReloadlyService {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.axiosInstance = axios_1.default.create({
            baseURL: process.env.RELOADLY_API_BASE_URL,
        });
    }
    async authenticate() {
        if (this.accessToken) {
            return this.accessToken;
        }
        try {
            const response = await axios_1.default.post(process.env.RELOADLY_AUTH_URL, {
                client_id: process.env.RELOADLY_CLIENT_ID,
                client_secret: process.env.RELOADLY_CLIENT_SECRET,
                grant_type: 'client_credentials',
                audience: process.env.RELOADLY_API_BASE_URL,
            });
            this.accessToken = response.data.access_token;
            return this.accessToken;
        }
        catch (error) {
            throw new common_1.HttpException('Reloadly Authentication Failed', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async topUp(reloadlyDto) {
        const token = await this.authenticate();
        const transactionId = `reloadly_${Date.now()}`;
        await this.transactionService.create({
            ...reloadlyDto,
            transactionId,
            status: 'pending',
        });
        try {
            const response = await this.axiosInstance.post('/topups', {
                recipientPhone: {
                    countryCode: reloadlyDto.phoneNumber.substring(0, 2),
                    number: reloadlyDto.phoneNumber,
                },
                operatorId: reloadlyDto.operatorId,
                amount: reloadlyDto.amount,
                currencyCode: reloadlyDto.currency,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await this.transactionService.update(transactionId, reloadlyDto.status);
            return response.data;
        }
        catch (error) {
            await this.transactionService.update(transactionId, reloadlyDto.status);
            throw new common_1.HttpException('Reloadly Top-up Failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOperatorsByCountry(reloadlyDto) {
        const token = await this.authenticate();
        const transactionId = `reloadly_op_${Date.now()}`;
        await this.transactionService.create({
            ...reloadlyDto,
            transactionId,
            status: 'pending',
        });
        try {
            const response = await this.axiosInstance.get(`/operators/countries/${reloadlyDto.countryCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await this.transactionService.update(transactionId, reloadlyDto.status);
            return response.data;
        }
        catch (error) {
            await this.transactionService.update(transactionId, reloadlyDto.status);
            throw new common_1.HttpException('Failed to Retrieve Operators', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ReloadlyService = ReloadlyService;
exports.ReloadlyService = ReloadlyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], ReloadlyService);
//# sourceMappingURL=reloadly.service.js.map