import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate, v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { User, UserWithoutPassword } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): UserWithoutPassword[] {
    return this.users.map(({ password, ...user }) => user);
  }

  getUserById(id: string): User {
    this.validateId(id);
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      password: undefined,
    };
  }

  createUser(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    const newUser: User = {
      id: uuidV4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: undefined,
    };

    this.users.push(newUser);
    return {
      ...newUser,
      password: undefined,
    };
  }

  updateUserPassword(id: string, updateUserDto: UpdatePasswordDTO): User {
    const { oldPassword, newPassword } = updateUserDto;
    this.validateId(id);
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong')
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return {
      ...user,
      password: undefined
    }
  }

  deleteUser(id: string): void {
    this.validateId(id);
    const index = this.users.findIndex((user) => user.id === id)
    if (index === -1) {
      throw new NotFoundException('User not found')
    }
    this.users.splice(index, 1)
  }

  private validateId(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('not UUID');
    }
  }
}
