import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { QuerySessionDto } from './dto/query-session.dto';
import { SessionAccountDto } from './dto/session-account.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { Role } from './entities/role.enum';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createAccountDto: CreateAccountDto) {
    return this.prisma.user.create({
      data: {
        name: createAccountDto.name,
        email: createAccountDto.email,
        password: createAccountDto.password,
        role: Role.MANAGER,
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
  createSession(sessionAccountDto: SessionAccountDto) {
    return this.prisma.session.create({
      data: {
        user_id: sessionAccountDto.user_id,
        user_agent: sessionAccountDto.user_agent,
        ip_address: sessionAccountDto.ip_address,
      },
    });
  }
  deleteSession(user_id: string) {
    return this.prisma.session.updateMany({
      where: {
        user_id,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
  async findAllSessions(querySessionDto: QuerySessionDto) {
    const page = querySessionDto.page || 1;
    const perPage = querySessionDto.perPage || 10;
    const orderBy = {
      [querySessionDto.orderBy || 'created_at']: querySessionDto.sort || 'desc',
    };
    const skip = (page - 1) * perPage;
    const take = perPage;
    const select = {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          company: {
            select: {
              id: true,
              company_name: true,
            },
          },
        },
      },
      user_agent: true,
      ip_address: true,
      created_at: true,
    };
    const [records, total] = await this.prisma.$transaction([
      this.prisma.session.findMany({
        where: {
          deleted_at: null,
        },
        skip,
        select,
        take,
        orderBy,
      }),
      this.prisma.session.count(),
    ]);
    return { records, total, pages: Math.ceil(total / take) };
  }

  updatePreference(user_id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.prisma.preference.update({
      where: { user_id },
      data: {
        ...updatePreferenceDto,
      },
      select: {
        dark_mode: true,
        language: true,
      },
    });
  }
}
