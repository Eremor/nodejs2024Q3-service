import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    )

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET_KEY
        }
      )
      request['user'] = decoded;
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
