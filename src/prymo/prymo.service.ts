import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { TransactionService } from '../transaction/transaction.service';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../transaction/dto/update-transaction.dto';

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
    const transactionDto: CreateTransactionDto = {
      userId,
      phoneNumber,
      operatorId,
      amount,
      currency: 'GHS', // Assuming local currency for Prymo
      transactionId,
      status: 'pending',
      type: 'topup', // Adding transaction type
      operator: operatorId, // Adding operator field
      serviceCode: 'N/A', // Add missing property
      transMessage: 'N/A', // Add missing property
      serviceTransId: 'N/A', // Add missing property
      transStatus: 'N/A', // Add missing property
      balance_before: '0', // Add this line
      balance_after: '0', // Add this line
    };
    await this.transactionService.create(transactionDto);

    try {
      const response = await this.axiosInstance.post('/topup', {
        phoneNumber,
        operatorId,
        amount,
      });

      // Update transaction status to 'success'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'success',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'failed',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);
      throw new HttpException('Prymo Top-up Failed', HttpStatus.BAD_REQUEST);
    }
  }

  public async getOperators(userId: string) {
    const transactionId = `prymo_op_${Date.now()}`;

    // Record transaction
    const transactionDto: CreateTransactionDto = {
      userId,
      phoneNumber: 'N/A', // Assuming 'N/A' for phoneNumber as it's not provided
      operatorId: 'N/A', // Assuming 'N/A' for operatorId as it's not provided
      amount: 0, // Assuming 0 for amount as it's not provided
      currency: 'GHS', // Assuming local currency for Prymo
      transactionId: transactionId,
      status: 'pending',
      type: 'topup', // Adding transaction type
      operator: 'N/A', // Assuming 'N/A' for operator as it's not provided
      serviceCode: 'N/A', // Add missing property
      transMessage: 'N/A', // Add missing property
      serviceTransId: 'N/A', // Add missing property
      transStatus: 'N/A', // Add missing property
      balance_before: '0', // Add this line
      balance_after: '0', // Add this line
    };
    await this.transactionService.create(transactionDto);

    try {
      const response = await this.axiosInstance.get('/operators');

      // Update transaction status to 'success'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'success',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'failed',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);
      throw new HttpException('Failed to Retrieve Prymo Operators', HttpStatus.BAD_REQUEST);
    }
  }

  public async sendSMS(phoneNumber: string, message: string, userId: string) {
    const transactionId = `prymo_sms_${Date.now()}`;

    // Record transaction
    const transactionDto: CreateTransactionDto = {
      userId,
      phoneNumber,
      operatorId: 'N/A',
      amount: 0,
      currency: 'N/A',
      transactionId,
      status: 'pending',
      type: 'sms', // Add this line
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

      // Update transaction status to 'success'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'success',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);

      return response.data;
    } catch (error) {
      // Update transaction status to 'failed'
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'failed',
        ...transactionDto,
      };
      await this.transactionService.update(transactionId, updateTransactionDto);
      throw new HttpException('Prymo SMS Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
