import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/prisma.service';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    PrismaService,
    AccountRepository,
    UserService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AccountModule {}
