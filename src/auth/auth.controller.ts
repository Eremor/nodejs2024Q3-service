import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('signup')
  @ApiTags('Signup')
  @ApiOperation({
    summary: 'Signup',
    description: 'Signup a user'
  })
  @ApiResponse({
    status: 201,
    description: 'Successful signup',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. No login or password'
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiTags('Login')
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and return a JWT-token'
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. No login or password'
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect login or password'
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @ApiTags('Refresh token')
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh token'
  })
  @ApiResponse({
    status: 200,
    description: 'Get new pair of access and refresh tokens'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string'
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'No refresh token in body'
  })
  @ApiResponse({
    status: 403,
    description: 'Refresh token is invalid or expired'
  })
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto)
  }
}
