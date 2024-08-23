import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardService {

  private readonly logger = new Logger(RewardService.name);
  
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
  ) {}
  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    this.logger.debug('createRewardDto +++ ', createRewardDto);
    const createdReward = new this.rewardModel({
      ...createRewardDto,
      userId: createRewardDto.userId,
      history: [
        {
          date: new Date(),
          points: createRewardDto.points,
          reason: createRewardDto.reason || 'Initial points',
        },
      ],
    });
    return createdReward.save();
  }

  async findAll(): Promise<{ rewards: Reward[]; totalPoints: number; totalCount: number }> {
    const rewards = await this.rewardModel.find().exec();
    const totalPoints = rewards.reduce((acc, reward) => acc + reward.points, 0);
    const totalCount = rewards.length;
    return { rewards, totalPoints, totalCount };
  }
  async findOne(userId: string): Promise<{ reward: Reward; totalPoints: number }> {
    const reward = await this.rewardModel.findOne({ userId }).exec();
    const totalPoints = reward.history.reduce((acc, item) => acc + item.points, 0);
    return { reward, totalPoints };
  }

  async update(
    userId: string,
    updateRewardDto: UpdateRewardDto,
  ): Promise<Reward> {
    const reward = await this.rewardModel.findOne({ userId }).exec();
    if (!reward) {
      throw new Error('Reward not found');
    }

    reward.points += updateRewardDto.points;
    reward.history.push({
      date: new Date(),
      points: updateRewardDto.points,
      reason: updateRewardDto.reason,
    });

    return reward.save();
  }

  async delete(userId: string): Promise<void> {
    await this.rewardModel.findOneAndDelete({ userId }).exec();
  }
}
