import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h'
      }
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
