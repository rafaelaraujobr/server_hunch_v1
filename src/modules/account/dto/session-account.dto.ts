import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class SessionAccountDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  user_agent: string;

  @IsString()
  @IsOptional()
  ip_address: string;

  @IsString()
  @IsOptional()
  origin: string;
}
