import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createAccountDto: CreateAccountDto) {
    return this.prisma.user.create({
      data: {
        name: createAccountDto.name,
        email: createAccountDto.email,
        password: createAccountDto.password,
        preference: {
          create: {},
        },
        company: {
          create: {
            company_name: createAccountDto.company_name,
          },
        },
      },
    });
  }
}
