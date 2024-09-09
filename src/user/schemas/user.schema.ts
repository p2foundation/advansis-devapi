import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  phoneNumber: string;
  
  @Prop()
  gravatar: string;
  @Prop({ required: true, default: 'USER' })
  roles: string[];
  @Prop()
  qrCode: string; // For agents/merchants
  @Prop()
  points: number; // Reward points
  @Prop({ required: true, default: 'ACTIVE'})
  status: string;

  @Prop({ required: false, default: false })
  emailVerified: boolean;
  @Prop({ required: false, default: false })
  phoneVerified: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ default: 0 })
  qrCodeUsageCount: number;

  @Prop()
  lastQRCodeUsage: Date;

  @Prop({ default: '' })
  invitationLink: string;

  @Prop({ default: 0 })
  invitationLinkUsageCount: number;

  @Prop()
  lastInvitationLinkUsage: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
