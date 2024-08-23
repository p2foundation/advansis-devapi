import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { Reward, RewardSchema } from './schemas/reward.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }])],
  providers: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
