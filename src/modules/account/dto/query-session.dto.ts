import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QuerySessionDto {
  @IsString()
  @IsOptional()
  companyName: string;

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

  @IsString()
  @IsOptional()
  user_id: string;
}
