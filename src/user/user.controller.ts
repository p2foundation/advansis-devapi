import { Controller, Get, Post, Body, Put, Request, UseGuards, Logger, Delete, Param, NotFoundException, Headers, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRefreshGuard } from '../auth/jwt-refresh.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: CreateUserDto })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: CreateUserDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Refresh user token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully', type: CreateUserDto })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
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

  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({ status: 200, description: 'User points retrieved', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('points')
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
    console.log('profile ==>',user);
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
  @ApiBody({  })
  async merchantLogin(@Body() loginDto: { clientId: string; clientKey: string }) {
    const merchant = await this.authService.validateMerchant(loginDto.clientId, loginDto.clientKey);
    if (!merchant) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.merchantLogin(merchant);
  }
  // Other endpoints...
}
