import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from './schemas/merchant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }])
  ],
  providers: [MerchantService],
  controllers: [MerchantController],
  exports: [MerchantService, MongooseModule], // Export MerchantService

})
export class MerchantModule {}
