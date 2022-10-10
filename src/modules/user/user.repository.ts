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
    const select = {
      id: true,
      email: true,
      name: true,
      preference: {
        select: {
          language: true,
        },
      },
      company: {
        select: {
          id: true,
          company_name: true,
        },
      },
      created_at: true,
      updated_at: true,
    };
    const where = {
      name: queryUserDto.name,
      email: queryUserDto.email,
      company: {
        company_name: queryUserDto.company_name,
      },
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
        select,
      }),
      this.prisma.user.count({ where }),
    ]);
    return { records, total, pages: Math.ceil(total / take) };
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  findByCompany(company_id: string) {
    return this.prisma.user.findMany({ where: { company_id } });
  }
}
