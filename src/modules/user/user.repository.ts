import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(queryUserDto: QueryUserDto) {
    const page = queryUserDto.page || 1;
    const perPage = queryUserDto.perPage || 10;
    const orderBy = {
      [queryUserDto.orderBy || 'created_at']: queryUserDto.sort || 'desc',
    };
    const skip = (page - 1) * perPage;
    const take = perPage;
    //   id: true,
    //   email: true,
    //   name: true,
    //   preference: {
    //     select: {
    //       language: true,
    //       dark_mode: true,
    //     },
    //   },
    //   companies: {
    //     select: {
    //       company_id: true,
    //       role: true,
    //     },
    //   },
    //   created_at: true,
    //   updated_at: true,
    // };
    const where = {
      name: queryUserDto.name,
      email: queryUserDto.email,
      OR: [
        { name: { contains: queryUserDto.search || '' } },
        { email: { contains: queryUserDto.search || '' } },
      ],
    };
    const [records, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        orderBy,
        where,
        include: {
          preference: {
            select: {
              language: true,
              dark_mode: true,
            },
          },
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
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      records: records.map((record) => {
        delete record.password;
        return {
          ...record,
          companies: record.companies.map((item) => {
            return {
              id: item.company_id,
              company_name: item.company.company_name,
              role: item.role,
            };
          }),
        };
      }),
      total,
      pages: Math.ceil(total / take),
    };
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        preference: {
          select: {
            language: true,
            dark_mode: true,
          },
        },
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
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      preference: user.preference,
      companies: user.companies.map((item) => {
        return {
          id: item.company_id,
          company_name: item.company.company_name,
          role: item.role,
        };
      }),
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async findByCompany(company_id: string) {
    const user = await this.prisma.user.findMany({
      where: { companies: { some: { company_id } } },
      include: {
        preference: {
          select: {
            language: true,
            dark_mode: true,
          },
        },
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
    });

    return user.map((user) => {
      delete user.password;
      return {
        ...user,
        companies: user.companies.map((item) => {
          return {
            id: item.company_id,
            company_name: item.company.company_name,
            role: item.role,
          };
        }),
      };
    });
  }
}
