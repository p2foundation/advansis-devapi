import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
export declare class RewardController {
    private readonly rewardService;
    private logger;
    constructor(rewardService: RewardService);
    create(createRewardDto: CreateRewardDto, req: any): Promise<import("./schemas/reward.schema").Reward>;
    findAll(): Promise<{
        rewards: import("./schemas/reward.schema").Reward[];
        totalPoints: number;
        totalCount: number;
    }>;
    findOne(userId: string): Promise<{
        reward: import("./schemas/reward.schema").Reward;
        totalPoints: number;
    }>;
    update(userId: string, updateRewardDto: UpdateRewardDto): Promise<import("./schemas/reward.schema").Reward>;
    delete(userId: string): Promise<void>;
}
