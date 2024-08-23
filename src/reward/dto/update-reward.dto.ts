export class UpdateRewardDto {
    readonly points: number;
    readonly reason?: string;
    readonly rewardType?: string;
    readonly expirationDate?: Date;
}
