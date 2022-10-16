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
  async create(createAccountDto: CreateAccountDto) {
    try {
      return await this.prisma.$transaction(async (tx: any) => {
        const user = await tx.user.create({
          data: {
            name: createAccountDto.name,
            email: createAccountDto.email,
            password: createAccountDto.password,
            preference: {
              create: {},
            },
          },
        });
        const company = await tx.company.create({
          data: {
            company_name: createAccountDto.company_name,
          },
        });

        await tx.companiesOnUsers.create({
          data: {
            company_id: company.id,
            user_id: user.id,
            role: Role.ADMIN,
          },
        });
        return user;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  createSession(sessionAccountDto: SessionAccountDto) {
    return this.prisma.session.create({
      data: {
        user_id: sessionAccountDto.user_id,
        user_agent: sessionAccountDto.user_agent,
        origin: sessionAccountDto.origin,
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
    const [records, total] = await this.prisma.$transaction([
      this.prisma.session.findMany({
        // where: {
        //   deleted_at: null,
        // },
        skip,
        take,
        orderBy,
        include: {
          user: {
            include: {
              companies: {
                include: {
                  company: {
                    select: {
                      company_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.session.count({
        // where: {
        //   deleted_at: null,
        // },
      }),
    ]);
    return {
      records: records.map((record) => {
        return {
          id: record.id,
          user_agent: record.user_agent,
          origin: record.origin,
          ip_address: record.ip_address,
          created_at: record.created_at,
          deleted_at: record.deleted_at,
          user: {
            id: record.user.id,
            name: record.user.name,
            email: record.user.email,
            companies: record.user.companies.map((item) => {
              return {
                id: item.company_id,
                company_name: item.company.company_name,
                role: item.role,
              };
            }),
          },
        };
      }),
      total,
      pages: Math.ceil(total / take),
    };
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
