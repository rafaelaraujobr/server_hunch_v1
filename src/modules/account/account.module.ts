import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'src/prisma.service';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    PrismaService,
    AccountRepository,
    UserService,
    UserRepository,
  ],
})
export class AccountModule {}
