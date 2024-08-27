import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<RewardDocument>) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const createdReward = new this.rewardModel({
      ...createRewardDto,
      history: [{ date: new Date(), points: createRewardDto.points, reason: 'Initial points' }]
    });
    return createdReward.save();
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }

  async findOne(userId: string): Promise<Reward> {
    return this.rewardModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    const reward = await this.rewardModel.findOne({ userId }).exec();
    if (!reward) {
      throw new Error('Reward not found');
    }

    reward.points += updateRewardDto.points;
    reward.history.push({ date: new Date(), points: updateRewardDto.points, reason: updateRewardDto.reason });

    return reward.save();
  }

  async delete(userId: string): Promise<void> {
    await this.rewardModel.findOneAndDelete({ userId }).exec();
  }
}
