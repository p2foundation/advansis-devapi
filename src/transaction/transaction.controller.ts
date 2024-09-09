import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
  @ApiBody({
    type: CreateTransactionDto,
    description: 'Transaction data',
    examples: {
      example1: {
        value: {
          userId: '123456',
          transactionType: 'airtime',
          amount: 10,
          currency: 'GHS',
          status: 'pending',
          transactionId: 'TRX123456',
          operator: 'MTN',
          recipientPhone: '233241234567'
        }
      }
    }
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Return all transactions.' })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by id' })
  @ApiResponse({ status: 200, description: 'Return the transaction.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiBody({
    type: UpdateTransactionDto,
    description: 'Updated transaction data',
    examples: {
      example1: {
        value: {
          status: 'completed',
          transactionMessage: 'Transaction successful'
        }
      }
    }
  })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all transactions for a user' })
  @ApiResponse({ status: 200, description: 'Return all transactions for the user.' })
  findByUserId(@Param('userId') userId: string) {
    return this.transactionService.findByUserId(userId);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get all transactions of a specific type' })
  @ApiResponse({ status: 200, description: 'Return all transactions of the specified type.' })
  findByType(@Param('type') type: string) {
    return this.transactionService.findByType(type);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get all transactions with a specific status' })
  @ApiResponse({ status: 200, description: 'Return all transactions with the specified status.' })
  findByStatus(@Param('status') status: string) {
    return this.transactionService.findByStatus(status);
  }

  @Get('stats/:userId')
  @ApiOperation({ summary: 'Get transaction statistics for a user' })
  @ApiResponse({ status: 200, description: 'Return transaction statistics for the user.' })
  getTransactionStats(@Param('userId') userId: string) {
    return this.transactionService.getTransactionStats(userId);
  }
}
