import { IsString, IsOptional } from 'class-validator';

export class UpdateSpeciesDto {
  @IsOptional()
  @IsString()
  desc?: string;
}
