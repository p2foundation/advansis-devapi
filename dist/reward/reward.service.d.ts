import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
export declare class RewardService {
    private rewardModel;
    constructor(rewardModel: Model<RewardDocument>);
    create(createRewardDto: CreateRewardDto): Promise<Reward>;
    findAll(): Promise<Reward[]>;
    findOne(userId: string): Promise<Reward>;
    update(userId: string, updateRewardDto: UpdateRewardDto): Promise<Reward>;
    delete(userId: string): Promise<void>;
}
