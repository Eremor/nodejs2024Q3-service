import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword } from 'src/utils';
import { LoginDto } from './dto/login.dto';
import { AuthPayload, AuthTokens } from './interfaces/auth.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ){}

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const { login, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { login }
    })

    if (!user) {
      throw new ForbiddenException('Incorrect login')
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect password')
    }

    const payload: AuthPayload = {
      userId: user.id,
      login: user.login
    }

    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      }
    );
    const refreshToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
      }
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthTokens> {
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayload>(refreshTokenDto.refreshToken)
      const accessToken = await this.jwtService.signAsync(payload)
      const refreshToken = await this.jwtService.signAsync(
        payload,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
        }
      )

      return {
        accessToken,
        refreshToken
      }
    } catch {
      throw new ForbiddenException('Invalid or expire token')
    }
  }
}
