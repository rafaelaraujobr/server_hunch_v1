import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { QueryCompanyDto } from './dto/query-company.dto';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  // create(createCompanyDto: CreateCompanyDto) {
  //   return 'This action adds a new company';
  // }

  findAll(queryCompanyDto: QueryCompanyDto) {
    console.log('queryCompanyDto', queryCompanyDto);
    return this.companyRepository.findAll(queryCompanyDto);
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
