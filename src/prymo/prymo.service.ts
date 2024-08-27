import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class PrymoService {
  private axiosInstance: AxiosInstance;

  constructor(private readonly transactionService: TransactionService) {
    this.axiosInstance = axios.create({
      baseURL: process.env.PRYMO_API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${process.env.PRYMO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public async topUp(phoneNumber: string, operatorId: string, amount: number, userId: string) {
    const transactionId = `prymo_${Date.now()}`;

    // Record transaction
    await this.transactionService.create({
      userId,
      phoneNumber,
      operatorId,
      amount,
      currency: 'GHS', // Assuming local currency for Prymo
      transactionId,
      status: 'pending',
    });

    try {
      const response = await this.axiosInstance.post('/topup', {
        phoneNumber,
        operatorId,
        amount,
      });

      // Update transaction status to 'success'
      await this.transactionService.update(transactionId, { status: 'success' });

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      await this.transactionService.update(transactionId, { status: 'failed' });
      throw new HttpException('Prymo Top-up Failed', HttpStatus.BAD_REQUEST);
    }
  }

  public async getOperators(userId: string) {
    const transactionId = `prymo_op_${Date.now()}`;

    // Record transaction
    await this.transactionService.create({
      userId,
      phoneNumber: 'N/A',
      operatorId: 'N/A',
      amount: 0,
      currency: 'N/A',
      transactionId,
      status: 'pending',
    });

    try {
      const response = await this.axiosInstance.get('/operators');

      // Update transaction status to 'success'
      await this.transactionService.update(transactionId, { status: 'success'});

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      await this.transactionService.update(transactionId, { status: 'failed' });
      throw new HttpException('Failed to Retrieve Prymo Operators', HttpStatus.BAD_REQUEST);
    }
  }

  public async sendSMS(phoneNumber: string, message: string, userId: string) {
    const transactionId = `prymo_sms_${Date.now()}`;

    // Record transaction
    await this.transactionService.create({
      userId,
      phoneNumber,
      operatorId: 'N/A',
      amount: 0,
      currency: 'N/A',
      transactionId,
      status: 'pending',
    });

    try {
      const response = await this.axiosInstance.post('/sms', {
        phoneNumber,
        message,
      });

      // Update transaction status to 'success'
      await this.transactionService.update(transactionId, { status: 'success' });

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      await this.transactionService.update(transactionId, { status: 'failed' });
      throw new HttpException('Prymo SMS Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
