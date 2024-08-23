import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Logger, Request } from '@nestjs/common'; // Added Request import
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('rewards')
@ApiBearerAuth()
@Controller('api/v1/rewards')
export class RewardController {
  private logger = new Logger(RewardController.name);

  constructor(private readonly rewardService: RewardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new reward' })
  @ApiResponse({ status: 201, description: 'The reward has been successfully created', type: CreateRewardDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: String })
  @ApiResponse({ status: 409, description: 'Reward already exists', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Reward Name' },
        reason: { type: 'string', example: 'Reward Description' },
        points: { type: 'number', example: 100 },
        expirationDate: { type: 'string', example: '2023-01-01' },
      },
      required: ['name', 'reason', 'points',],
    },
  })
  async create(
    @Body() createRewardDto: CreateRewardDto, 
    @Request() req
  ) {
    this.logger.log(`RewardDto ==> ${JSON.stringify(createRewardDto)}`);
    console.debug('req.user +++ ',req.user);

    // Check if req.user.id is defined
    if (!req.user || !req.user.sub) {
      throw new Error('User ID is not available in the request');
    }
    createRewardDto.userId = req.user.sub;
    return this.rewardService.create(createRewardDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find all rewards' })
  @ApiResponse({ status: 200, description: 'List of rewards', isArray: true, type: [CreateRewardDto] })
  @Get()
  async findAll() {
    return this.rewardService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find a reward by userId' })
  @ApiResponse({ status: 200, description: 'The found reward', type: CreateRewardDto })
  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.rewardService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a reward' })
  @ApiResponse({ status: 200, description: 'The reward has been successfully updated', type: UpdateRewardDto })
  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateRewardDto: UpdateRewardDto
  ) {
    return this.rewardService.update(userId, updateRewardDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a reward' })
  @ApiResponse({ status: 200, description: 'The reward has been successfully removed' })
  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.rewardService.delete(userId);
  }
}
