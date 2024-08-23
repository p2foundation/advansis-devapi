import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: false })
  userId: string;
  @Prop()
  merchantId: string;
  @Prop()
  merchantName: string;
  @Prop()
  retailerName: string; // Prymo, 
  @Prop({ required: true })
  transType: string; // 'airtime' or 'data'
  @Prop()
  serviceType: String; // debit|credit|reverse wallet
  @Prop()
  customerName: String;
  @Prop()
  customerEmail: String;
  @Prop()
  customerPhone: String;
  @Prop()
  serviceTransId: String; // 5F9MGT61D7K6
  @Prop()
  transMessage: String; // Transaction Successful|Failed|Completed
  @Prop()
  paymentMethod: String; // momo, visa, mpesa
  @Prop()
  paymentStatus: String; // enum { pending, complete }
  @Prop()
  currentBalance: String;
  @Prop()
  balanceBefore: String;
  @Prop()
  balanceAfter: String;
  @Prop()
  reward: String;
  @Prop()
  commentary: String;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: false })
  currency: string;
  @Prop()
  localTransId: String;
  @Prop()
  amountPaid: String;
  @Prop()
  charge: String;
  @Prop()
  recipientNumber: String;
  @Prop()
  senderNumber: String;
  @Prop()
  transDescription: String;
  @Prop({ required: true })
  transStatus: string; // 'pending', 'completed', 'failed'
  @Prop()
  referrerClientId?: string;
  @Prop()
  transactionId: string;
  @Prop()
  networkOperator: string; // network operator like MTN, AIRTEL, VODAFONE
  @Prop({ default: Date.now })
  timestamp: Date;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now, set: (v: Date) => v })
  updatedAt: Date;

      recipient: recipientNumber || '',
        amount: amount || '',
          trxn: GeneratorUtil.generateTransactionId() || '',
            originalAmount: '',
              fee: 0,
                recipientNumber: recipientNumber || '',
                  transMessage: '',
                    transStatus: '',
                      commentary: '',
                        balance_before: '',
                          balance_after: '',
                            currentBalance: '',
  // Other properties...
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
