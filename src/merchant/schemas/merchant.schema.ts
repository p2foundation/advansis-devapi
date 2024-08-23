import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MerchantDocument = Merchant & Document;

@Schema()
export class Merchant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  clientId: string;

  @Prop({ required: true })
  clientKey: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  qrCode: string;

  @Prop({ default: 0 })
  rewardPoints: number;

  @Prop({ required: false })
  address: string;
  @Prop({ required: false })
  city: string;
  @Prop({ required: false })
  state: string;
  @Prop({ required: false })
  country: string;
  @Prop({ required: false })
  zipCode: string;
  @Prop({ required: false })
  GPSAddress: string;

  @Prop({ default: false })
  isVerified: boolean;
  @Prop({ default: false })
  isActive: boolean;
  
  @Prop()
  lastLogin: Date;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updatedAt: Date;
  // Other properties...
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
