import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdatePreferenceDto {
  @IsBoolean()
  @IsOptional()
  dark_mode: boolean;

  @IsString()
  @IsOptional()
  language: string;
}
