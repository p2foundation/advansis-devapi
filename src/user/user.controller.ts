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

 
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: String })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        role: {
          type: 'string',
          enum: ['USER', 'AGENT', 'ADMIN', 'DEVELOPER', 'MERCHANT', 'GUEST']
        }
      },
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`UserDto ==> ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

 
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: CreateUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'Peprah' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    }
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post('refresh-token')
  @ApiOperation({ summary: 'Generate a new refresh token' })
  @ApiResponse({ status: 200, description: 'New refresh token generated', type: String })
  @ApiBearerAuth()
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
    this.logger.debug(`User Profile request ==> ${JSON.stringify(req.user)}`);
    const user = await this.userService.findOneById(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...profile } = user;
    return profile; // Corrected to return the profile without password
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

  @ApiOperation({ summary: 'Merchant login', description: 'Logs in a merchant using their client ID and client key.' })
  @ApiResponse({ status: 200, description: 'Merchant logged in successfully', type: CreateUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized access', type: String })
  @Post('merchant/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        clientId: { type: 'string', description: 'Unique identifier for the merchant', example: 'merchant123' },
        clientKey: { type: 'string', description: 'Secret key for the merchant', example: 'secretKey123' },
      },
      required: ['clientId', 'clientKey'],
    }
  })
  async merchantLogin(@Body() loginDto: { clientId: string; clientKey: string }) {
    const merchant = await this.authService.validateMerchant(loginDto.clientId, loginDto.clientKey);
    if (!merchant) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.merchantLogin(merchant);
  }
  // Other endpoints...
}