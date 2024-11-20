import { IsString, IsOptional } from 'class-validator';

export class UpdateClassesDto {
  @IsOptional()
  @IsString()
  desc?: string;
}
