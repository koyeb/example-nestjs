import { IsString, IsOptional } from 'class-validator';

export class UpdateCharTypeDto {
  @IsOptional()
  @IsString()
  desc?: string;
}
