import { IsOptional, IsString } from 'class-validator';

export class UpdateWorldDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
