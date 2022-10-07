import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryCompanyDto } from './dto/query-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(queryCompanyDto: QueryCompanyDto) {
    const page = queryCompanyDto.page || 1;
    const perPage = queryCompanyDto.perPage || 10;
    const orderBy = {
      [queryCompanyDto.orderBy || 'created_at']: queryCompanyDto.sort || 'desc',
    };
    const skip = (page - 1) * perPage;
    const take = perPage;
    const select = {
      id: true,
      company_name: true,
      users: {
        select: {
          id: true,
          name: true,
        },
      },
      created_at: true,
      updated_at: true,
    };
    const where = {
      company_name: queryCompanyDto.company_name,
      OR: [
        { company_name: { contains: queryCompanyDto.search || '' } },
        {
          users: { some: { name: { contains: queryCompanyDto.search || '' } } },
        },
      ],
    };
    const [records, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        skip,
        take,
        orderBy,
        where,
        select,
      }),
      this.prisma.company.count({ where }),
    ]);
    return { records, total, pages: Math.ceil(total / take) };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} company`;
  // }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}
