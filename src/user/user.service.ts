import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UserWithoutPassword } from './interfaces/user.interface';
import { validateId } from '../utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: string): Promise<UserWithoutPassword> {
    validateId(id);
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const { login, password } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async updateUserPassword(
    id: string,
    updateUserDto: UpdatePasswordDTO,
  ): Promise<UserWithoutPassword> {
    const { oldPassword, newPassword } = updateUserDto;
    validateId(id);
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    validateId(id);
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
