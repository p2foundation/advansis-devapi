import { Controller, Get, Post, Body, Put, Request, UseGuards, Logger, Delete, Param, NotFoundException, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRefreshGuard } from '../auth/jwt-refresh.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: CreateUserDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties:
      {
        username: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        password: { type: 'string' },
        roles: {
          type: 'array',
          items: { type: 'string' }
        }, email: {
          type: 'string'
        },
        phoneNumber: { type: 'string' },
        referrerClientId: { type: 'string', description: 'Optional Merchant ClientID' }
      }
    }
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: CreateUserDto })
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
    return this.authService.login(req.user);
  }


  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh user token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully', type: CreateUserDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', description: 'Login token' }
      },
    },
  })
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @ApiOperation({ summary: 'Generate a new refresh token' })
  @ApiResponse({ status: 200, description: 'New refresh token generated', type: String })
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


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('points')
  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({ status: 200, description: 'User points retrieved', type: Number })
  async getPoints(@Request() req) {
    const user = await this.userService.findOneById(req.user.sub);
    return { points: user.points };
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved', type: CreateUserDto })
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
    console.log('profile ==>', user);
    return user;
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('profile/update')
  @ApiBody({ type: CreateUserDto })
  async updateProfile(@Request() req, @Body() updateData: any) {
    this.logger.debug(`Profile request ===> ${req.user}`);
    return this.userService.updateProfile(req.user.sub, updateData);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [CreateUserDto] })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: String })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:id')
  @ApiParam({ name: 'id', description: 'User ID', required: true })
  async deleteUserById(@Param('id') userId: string) {
    this.logger.debug(`Deleting user with ID: ${userId}`);
    return this.userService.deleteUserById(userId);
  }

  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({ status: 200, description: 'All users deleted successfully', type: String })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  async deleteAllUsers() {
    this.logger.debug('Deleting all users');
    return this.userService.deleteAllUsers();
  }


  @Post('merchant/login')
  @ApiOperation({ summary: 'Merchant login' })
  @ApiResponse({ status: 200, description: 'Merchant logged in successfully', type: CreateUserDto })
  @ApiBody({
    description: 'Merchant login credentials',
    required: true,
    schema: {
      type: 'object',
      properties:
      {
        clientId: { type: 'string' },
        clientSecret: { type: 'string' },
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


  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })

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


  // Other endpoints...
}
