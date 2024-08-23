"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RewardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reward_schema_1 = require("./schemas/reward.schema");
let RewardService = RewardService_1 = class RewardService {
    constructor(rewardModel) {
        this.rewardModel = rewardModel;
        this.logger = new common_1.Logger(RewardService_1.name);
    }
    async create(createRewardDto) {
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
    async findAll() {
        const rewards = await this.rewardModel.find().exec();
        const totalPoints = rewards.reduce((acc, reward) => acc + reward.points, 0);
        const totalCount = rewards.length;
        return { rewards, totalPoints, totalCount };
    }
    async findOne(userId) {
        const reward = await this.rewardModel.findOne({ userId }).exec();
        const totalPoints = reward.history.reduce((acc, item) => acc + item.points, 0);
        return { reward, totalPoints };
    }
    async update(userId, updateRewardDto) {
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
    async delete(userId) {
        await this.rewardModel.findOneAndDelete({ userId }).exec();
    }
};
exports.RewardService = RewardService;
exports.RewardService = RewardService = RewardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reward_schema_1.Reward.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RewardService);
//# sourceMappingURL=reward.service.js.map