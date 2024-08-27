import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string; // 'airtime' or 'data'

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  status: string; // 'pending', 'completed', 'failed'

  @Prop()
  referrerClientId?: string;

  @Prop()
  transactionId: string;

  @Prop()
  operator: string; // network operator like MTN, AIRTEL, VODAFONE

  @Prop({ default: Date.now })
  timestamp: Date;
  
  @Prop()
  createdAt: Date;  
  @Prop()
  updatedAt: Date;

  // Other properties...
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
