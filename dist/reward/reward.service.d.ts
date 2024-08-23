import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
export declare class RewardService {
    private rewardModel;
    private readonly logger;
    constructor(rewardModel: Model<RewardDocument>);
    create(createRewardDto: CreateRewardDto): Promise<Reward>;
    findAll(): Promise<{
        rewards: Reward[];
        totalPoints: number;
        totalCount: number;
    }>;
    findOne(userId: string): Promise<{
        reward: Reward;
        totalPoints: number;
    }>;
    update(userId: string, updateRewardDto: UpdateRewardDto): Promise<Reward>;
    delete(userId: string): Promise<void>;
}
