import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class ReloadlyService {
    private axiosInstance: AxiosInstance;
    private accessToken: string;

    constructor(
        private readonly transactionService: TransactionService
    ) {
        this.axiosInstance = axios.create({
            baseURL: process.env.RELOADLY_API_BASE_URL,
        });
    }

    private async authenticate() {
        if (this.accessToken) {
            return this.accessToken;
        }

        try {
            const response = await axios.post(process.env.RELOADLY_AUTH_URL, {
                client_id: process.env.RELOADLY_CLIENT_ID,
                client_secret: process.env.RELOADLY_CLIENT_SECRET,
                grant_type: 'client_credentials',
                audience: process.env.RELOADLY_API_BASE_URL,
            });

            this.accessToken = response.data.access_token;
            return this.accessToken;
        } catch (error) {
            throw new HttpException('Reloadly Authentication Failed', HttpStatus.UNAUTHORIZED);
        }
    }

    public async topUp(reloadlyDto: any) {
        const token = await this.authenticate();
        const transactionId = `reloadly_${Date.now()}`;

        // Record transaction
        await this.transactionService.create({
            ...reloadlyDto,
            transactionId,
            status: 'pending',
        });

        try {
            const response = await this.axiosInstance.post('/topups', {
                recipientPhone: {
                    countryCode: reloadlyDto.phoneNumber.substring(0, 2), // Example format, adjust as needed
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

            // Update transaction status to 'success'
            await this.transactionService.update(transactionId, reloadlyDto.status);

            return response.data;
        } catch (error) {
            // Update transaction status to 'failed'
            await this.transactionService.update(transactionId, reloadlyDto.status);
            throw new HttpException('Reloadly Top-up Failed', HttpStatus.BAD_REQUEST);
        }
    }

    public async getOperatorsByCountry(reloadlyDto: any) {
        const token = await this.authenticate();
        const transactionId = `reloadly_op_${Date.now()}`;

        // Record transaction
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

            // Update transaction status to 'success'
            await this.transactionService.update(transactionId, reloadlyDto.status);
            return response.data;
        } catch (error) {
            // Update transaction status to 'failed'
            await this.transactionService.update(transactionId, reloadlyDto.status);
            throw new HttpException('Failed to Retrieve Operators', HttpStatus.BAD_REQUEST);
        }
    }
}
