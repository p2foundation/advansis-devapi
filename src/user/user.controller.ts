import { Controller, Get, Post, Body, Put, Request, UseGuards, Logger, Delete, Param, NotFoundException, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRefreshGuard } from '../auth/jwt-refresh.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RewardService } from 'src/reward/reward.service';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private rewardsService: RewardService,
  ) { }


  // Register user
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created',
    type: CreateUserDto,
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          firstName: 'Kofi',
          lastName: 'Annan',
          email: 'kofi.annan@example.com',
          phoneNumber: '+1234567890',
          roles: ['user'],
          createdAt: '2023-04-01T12:00:00Z',
          updatedAt: '2023-04-01T12:00:00Z'
        }
      }
    }
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Kofi' },
        lastName: { type: 'string', example: 'Annan' },
        password: { type: 'string', example: 'securePassword123' },
        roles: {
          type: 'array',
          items: { type: 'string' },
          example: ['user', 'MERCHANT']
        },
        email: {
          type: 'string',
          example: 'kofi.annan@example.com'
        },
        phoneNumber: { type: 'string', example: '+1234567890' },
        referrerClientId: { type: 'string', description: 'Optional Merchant ClientID', example: 'MERCH123' }
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

  // Login user
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    content: {
      'application/json': {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'kofi.annan@example.com',
            roles: ['user']
          }
        }
      }
    }
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' }
      },
    },
  })
  async login(@Request() req) {
    this.logger.debug(`User login request ==> ${JSON.stringify(req.user)}`);
    return this.authService.login(req.user);
  }


  // Generate a new refresh token
  @ApiOperation({ summary: 'Generate a new refresh token' })
  @ApiResponse({
    status: 200,
    description: 'New refresh token generated',
    type: String,
    content: {
      'application/json': {
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiBearerAuth()
  @Post('refresh-token')
  async genRefreshToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new Error('Invalid authorization header format');
    }

    return this.authService.refreshToken(token);
  }

  // User points
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('points')
  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({
    status: 200,
    description: 'User points retrieved',
    type: Number,
    content: {
      'application/json': {
        example: 1000
      }
    }
  })
  async getPoints(@Request() req) {
    const user = await this.userService.findOneById(req.user.sub);
    return { points: user.points };
  }

  // User profile
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved',
    type: CreateUserDto,
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          firstName: 'Kofi',
          lastName: 'Annan',
          email: 'kofi.annan@example.com',
          phoneNumber: '+1234567890',
          roles: ['user'],
          points: 1000,
          createdAt: '2023-04-01T12:00:00Z',
          updatedAt: '2023-04-01T12:00:00Z'
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    this.logger.debug(`Profile request ==> ${JSON.stringify(req.user)}`);
    const user = await this.userService.findOneById(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...profile } = user;
    return user;
  }

  // Update user profile
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: CreateUserDto,
    content: {
      'application/json': {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          firstName: 'Kofi',
          lastName: 'Annan',
          email: 'kofi.annan@example.com',
          phoneNumber: '+1234567890',
          roles: ['user'],
          points: 1000,
          createdAt: '2023-04-01T12:00:00Z',
          updatedAt: '2023-04-01T12:00:00Z'
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('profile/update')
  @ApiBody({
    description: 'Update user profile. Any combination of these properties can be provided.',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Kofi' },
        lastName: { type: 'string', example: 'Annan' },
        email: { type: 'string', example: 'kofi.annan@example.com' },
        phoneNumber: { type: 'string', example: '+1234567890' },
        referrerClientId: { type: 'string', description: 'Optional Merchant ClientID', example: 'MERCH123' },
        points: { type: 'number', example: 1000 },
        emailVerified: { type: 'boolean', example: false },
        phoneVerified: { type: 'boolean', example: false },
        status: { type: 'string', example: 'ACTIVE' },
        roles: {
          type: 'array',
          items: { type: 'string' },
          example: ['user', 'MERCHANT']
        },
      }
    }
  })
  async updateProfile(@Request() req, @Body() updateData: any) {
    this.logger.debug(`Profile request ===> ${req.user}`);
    return this.userService.updateProfile(req.user.sub, updateData);
  }

  // Get all users
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [CreateUserDto],
    content: {
      'application/json': {
        example: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            firstName: 'Kofi',
            lastName: 'Annan',
            email: 'kofi.annan@example.com',
            phoneNumber: '+1234567890',
            roles: ['user'],
            points: 1000,
            createdAt: '2023-04-01T12:00:00Z',
            updatedAt: '2023-04-01T12:00:00Z'
          },
          {
            id: '456f7890-a1b2-c3d4-e5f6-789012345678',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '+9876543210',
            roles: ['user', 'MERCHANT'],
            points: 2000,
            createdAt: '2023-04-02T10:30:00Z',
            updatedAt: '2023-04-02T10:30:00Z'
          }
        ]
      }
    }
  })
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Delete user by ID
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: String,
    content: {
      'application/json': {
        example: 'User deleted successfully'
      }
    }
  })
  @ApiParam({ name: 'id', description: 'User ID', required: true })
  async deleteUserById(@Param('id') userId: string) {
    this.logger.debug(`Deleting user with ID: ${userId}`);
    return this.userService.deleteUserById(userId);
  }

  // Delete all users
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({
    status: 200,
    description: 'All users deleted successfully',
    type: String,
    content: {
      'application/json': {
        example: 'All users deleted successfully'
      }
    }
  })
  async deleteAllUsers() {
    this.logger.debug('Deleting all users');
    return this.userService.deleteAllUsers();
  }

  // Merchant login
  @Post('merchant/login')
  @ApiOperation({ summary: 'Merchant login' })
  @ApiResponse({
    status: 200,
    description: 'Merchant logged in successfully',
    type: CreateUserDto,
    content: {
      'application/json': {
        example: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'kofi.annan@example.com',
            roles: ['user']
          }
        }
      }
    }
  })
  @ApiBody({
    description: 'Merchant login credentials',
    required: true,
    schema: {
      type: 'object',
      properties:
      {
        clientId: { type: 'string', example: 'MERCH123' },
        clientSecret: { type: 'string', example: 'secureMerchantSecret123' },
      },
    }
  })
  async merchantLogin(@Body() loginDto: { clientId: string; clientKey: string }) {
    const merchant = await this.authService.validateMerchant(loginDto.clientId, loginDto.clientKey);
    if (!merchant) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.merchantLogin(merchant);
  }

  // Change user password 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    content: {
      'application/json': {
        example: 'Password changed successfully'
      }
    }
  })
  @ApiBody({
    description: 'Password change credentials',
    required: true,
    schema: {
      type: 'object',
      properties: {
        currentPassword: { type: 'string', description: 'Current password of the user' },
        newPassword: { type: 'string', description: 'New password to set' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: { currentPassword: string; newPassword: string }
  ) {
    return this.authService.changePassword(req.user.sub, changePasswordDto.currentPassword, changePasswordDto.newPassword);
  }

  // Track QR code usage
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('track-qr-code-usage')
  @ApiOperation({ summary: 'Track QR code usage' })
  @ApiResponse({
    status: 200,
    description: 'QR code usage tracked successfully',
    content: {
      'application/json': {
        example: 'QR code usage tracked successfully'
      }
    }
  })
  async trackQRCodeUsage(@Request() req) {
    return this.userService.trackQRCodeUsage(req.user.sub);
  }
  
  // Get QR code usage stats
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('qr-code-usage-stats')
  @ApiOperation({ summary: 'Get QR code usage stats' })
  @ApiResponse({
    status: 200,
    description: 'QR code usage stats retrieved successfully',
    type: Object,
    content: {
      'application/json': {
        example: {
          totalScans: 10,
          lastScanDate: '2023-04-01T12:00:00Z'
        }
      }
    }
  })
  async getQRCodeUsageStats(@Request() req) {
    return this.userService.getQRCodeUsageStats(req.user.sub);
  }

  // Scan QR code
  @Post(':userId/scan-qr')
  @ApiOperation({ summary: 'Scan a user\'s QR code' })
  @ApiParam({ name: 'userId', description: 'The ID of the user whose QR code is being scanned' })
  @ApiResponse({
    status: 200,
    description: 'QR code scanned successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'QR code scanned and points awarded' }
      }
    }
  })
  async scanQRCode(@Param('userId') userId: string) {
    await this.userService.trackQRCodeUsage(userId);
    await this.rewardsService.awardQRCodeScanPoints(userId, 'user');
    return { message: 'QR code scanned and points awarded' };
  }
  

  // Generate invitation link
  @UseGuards(JwtAuthGuard)
  @Post('invitation-link/generate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate an invitation link for the user' })
  @ApiResponse({
    status: 201,
    description: 'Invitation link generated successfully',
    schema: {
      type: 'object',
      properties: {
        invitationLink: { type: 'string', example: 'https://example.com/invite/yyyymmdd/abc123' }
      }
    }
  })
  async generateInvitationLink(@Request() req): Promise<{ invitationLink: string }> {
    this.logger.debug(`Generating invitation link for user: ${req.user.sub}`);
    const invitationLink = await this.userService.generateInvitationLink(req.user.sub);
    return { invitationLink };
  }

  // Track invitation link usage
  @Post('invitation-link/track')
  @ApiOperation({ summary: 'Track the usage of an invitation link' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        invitationLink: { type: 'string', example: 'https://example.com/invite/yyyymmdd/abc123' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Invitation link usage tracked successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Invitation link usage tracked and points awarded' }
      }
    }
  })
  async trackInvitationLinkUsage(@Body('invitationLink') invitationLink: string) {
    this.logger.debug(`Tracking invitation link usage: ${invitationLink}`);
    await this.userService.trackInvitationLinkUsage(invitationLink);
    return { message: 'Invitation link usage tracked and points awarded' };
  }

  // Get invitation link stats
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('invitation-link/stats')
  @ApiOperation({ summary: 'Get statistics for the user\'s invitation link' })
  @ApiResponse({
    status: 200,
    description: 'Invitation link statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        usageCount: { type: 'number', example: 5 },
        lastUsed: { type: 'string', format: 'date-time', example: '2023-04-01T12:00:00Z' }
      }
    }
  })
  async getInvitationLinkStats(@Request() req) {
    return this.userService.getInvitationLinkStats(req.user.sub);
  }

  // Other endpoints...


}
