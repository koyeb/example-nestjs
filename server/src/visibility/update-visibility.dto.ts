import { IsString, IsOptional } from 'class-validator';

export class UpdateVisibilityDto {
  @IsOptional()
  @IsString()
  desc?: string;
}
