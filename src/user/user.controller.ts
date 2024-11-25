import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: User,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [User],
  })
  async findAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get single user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: `Update a user's password`,
    description: `Update a user's password by ID`,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated.',
    type: User,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDTO,
  ) {
    return this.userService.updateUserPassword(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
