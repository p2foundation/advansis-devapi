import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['airtime', 'data', 'momo', 'sms', 'reloadly'] })
  transType: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true, enum: ['pending', 'completed', 'failed'] })
  transStatus: string;

  @Prop()
  referrerClientId?: string;

  @Prop({ required: true, unique: true })
  transactionId: string;

  @Prop()
  operator: string; // network operator like MTN, AIRTEL, VODAFONE

  @Prop()
  recipientPhone: string;

  @Prop()
  recipientEmail: string;

  @Prop()
  dataPackage: string; // For internet data transactions

  @Prop()
  momoTransactionType: string; // For mobile money transactions (e.g., 'send', 'receive', 'withdraw')

  @Prop()
  reloadlyProductId: string; // For Reloadly transactions

  @Prop()
  reloadlyOperatorId: string; // For Reloadly transactions

  @Prop()
  reloadlyOperatorName: string; // For Reloadly transactions

  @Prop()
  reloadlyCountryCode: string; // For Reloadly transactions

  @Prop()
  transactionFee: number;

  @Prop()
  discountApplied: number;

  @Prop()
  pointsEarned: number;

  @Prop()
  pointsRedeemed: number;

  @Prop()
  transactionMessage: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  merchantId?: string; // Added from airtime top-up context

  @Prop()
  network?: string; // 0, 1, 2, 3, 4, 5, 6

  @Prop()
  trxn?: string; // Added from airtime top-up context

  @Prop()
  fee?: number; // Added from airtime top-up context

  @Prop()
  originalAmount?: string; // Added from airtime top-up context

  @Prop()
  commentary?: string; // Added from airtime top-up context

  @Prop()
  balance_before?: string; // Added from airtime top-up context

  @Prop()
  balance_after?: string; // Added from airtime top-up context

  @Prop()
  currentBalance?: string; // Added from airtime top-up context
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
