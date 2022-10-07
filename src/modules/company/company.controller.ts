import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  // Post, Body, Patch, Param, Delete
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { QueryCompanyDto } from './dto/query-company.dto';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/v1/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // @Post()
  // create(@Body() createCompanyDto: CreateCompanyDto) {
  //   return this.companyService.create(createCompanyDto);
  // }

  @Get()
  index(@Query() queryCompanyDto: QueryCompanyDto) {
    return this.companyService.findAll(queryCompanyDto);
  }

  @Get(':id')
  show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.companyService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(+id);
  // }
}
