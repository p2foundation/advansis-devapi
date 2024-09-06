import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Request, Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionController {
  private logger = new Logger(TransactionController.name);

  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully', type: CreateTransactionDto })
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    this.logger.log(`Creating transaction: ${JSON.stringify(createTransactionDto)}`);
    return this.transactionService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all transactions' })
  @ApiResponse({ status: 200, description: 'List of transactions', isArray: true, type: [CreateTransactionDto] })
  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction found', type: CreateTransactionDto })
  @Get(':transactionId')
  async findOne(@Param('transactionId') transactionId: string) {
    return this.transactionService.findOne(transactionId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully', type: UpdateTransactionDto })
  @Put(':transactionId')
  async update(@Param('transactionId') transactionId: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(transactionId, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @Delete(':transactionId')
  async delete(@Param('transactionId') transactionId: string) {
    return this.transactionService.delete(transactionId);
  }

}
