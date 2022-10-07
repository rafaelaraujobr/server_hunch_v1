import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryCompanyDto {
  @IsString()
  @IsOptional()
  company_name: string;

  @IsString()
  @IsOptional()
  search: string;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  perPage: number;

  @IsString()
  @IsOptional()
  orderBy: string;

  @IsString()
  @IsOptional()
  sort: string;
}
