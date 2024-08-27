import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Merchant, MerchantDocument } from './schemas/merchant.schema';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { v4 as uuidv4 } from 'uuid'; // Updated import
import { PasswordUtil } from 'src/utilities/password.util';
import { TokenUtil } from 'src/utilities/token.util';
import { generateQrCode } from 'src/utilities/qr-code.util';

@Injectable()
export class MerchantService {
  constructor(
    @Inject('MerchantModel') private readonly merchantModel: Model<Merchant>, // Ensure this matches the provider name
) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    const hashedPassword = await PasswordUtil.hashPassword(createMerchantDto.password);
    const clientId = uuidv4();
    const clientKey = TokenUtil.generateToken({ clientId }, '365d'); // Client key valid for 1 year

    // Check if the clientId already exists
    const existingMerchant = await this.merchantModel.findOne({ clientId }).exec();
    if (existingMerchant) {
      throw new Error('Client ID already exists');
    }

    const qrCode = await generateQrCode(clientId);

    const merchantData = {
      ...createMerchantDto,
      password: hashedPassword,
      clientId,
      clientKey,
      qrCode,
      address: [
        { 
          ghanaPostGPS: createMerchantDto.ghanaPostGPS, 
          street: createMerchantDto.street,
          city: createMerchantDto.city,
          state: createMerchantDto.state,
          zip: createMerchantDto.zip,
          country: createMerchantDto.country,
        }
      ]
    };

    const createdMerchant = new this.merchantModel(merchantData);
    return createdMerchant.save();
  }

  async findOneByClientId(clientId: string): Promise<Merchant | undefined> {
    return this.merchantModel.findOne({ clientId }).exec();
  }

  async update(merchantId: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant> {
    const updateData: Partial<Merchant> = { ...updateMerchantDto };
    if (updateData.password) {
      updateData.password = await PasswordUtil.hashPassword(updateData.password);
    }
    return this.merchantModel.findByIdAndUpdate(merchantId, updateData, { new: true }).exec();
  }

  async delete(merchantId: string): Promise<void> {
    await this.merchantModel.findByIdAndDelete(merchantId).exec();
  }
  
  async updateLastLogin(merchantId: string): Promise<void> {
    await this.merchantModel.findByIdAndUpdate(merchantId, { lastLogin: new Date() });
  }

  async findAllRegisteredMerchants(): Promise<{ merchants: Merchant[]; total: number }> {
    const merchants = await this.merchantModel.find().exec();
    const total = merchants.length;
    return { merchants, total };
  }
  
  async updateRewardPoints(clientId: string, points: number): Promise<void> {
    await this.merchantModel.updateOne(
      { clientId },
      { $inc: { rewardPoints: points } },
    ).exec();
  }
  // Other merchant management methods...
}