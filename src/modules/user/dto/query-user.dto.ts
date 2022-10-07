import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

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
