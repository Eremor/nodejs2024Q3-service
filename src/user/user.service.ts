import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UserWithoutPassword } from './interfaces/user.interface';
import { comparePassword, hashPassword, validateId } from '../utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(({ password, ...user }) => ({
      ...user,
      createdAt: Number(user.createdAt.getTime()),
      updatedAt: Number(user.updatedAt.getTime())
    }));
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

    return {
      ...userWithoutPassword,
      createdAt: Number(userWithoutPassword.createdAt.getTime()),
      updatedAt: Number(userWithoutPassword.updatedAt.getTime())
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const hashedPassword = await hashPassword(createUserDto.password)
    const newUser = await this.prismaService.user.create({
      data: {
        login: createUserDto.login,
        password: hashedPassword
      },
    });

    const { password, ...userWithoutPassword } = newUser;

    return {
      ...userWithoutPassword,
      createdAt: Number(userWithoutPassword.createdAt.getTime()),
      updatedAt: Number(userWithoutPassword.updatedAt.getTime())
    };
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

    const isMatchPassword = await comparePassword(oldPassword, user.password)

    if (!isMatchPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const hashedNewPassword = await hashPassword(newPassword)

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: user.version + 1,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return {
      ...userWithoutPassword,
      createdAt: Number(userWithoutPassword.createdAt.getTime()),
      updatedAt: Number(userWithoutPassword.updatedAt.getTime())
    };
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
