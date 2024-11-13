import { IsString, IsOptional } from 'class-validator';

export class CreateWorldDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
