// export class CreateRewardDto {
//     readonly userId: string;
//     readonly points: number;
//     readonly reason?: string;
//     readonly rewardType?: string;
//     readonly expirationDate?: Date;
//     readonly userId?: string;
// }

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  name: string;

  @IsString()
  reason: string;

  @IsNumber()
  points: number;

  @IsOptional() // Make userId optional if not always required
  @IsString()
  userId?: string; // Add userId field
}